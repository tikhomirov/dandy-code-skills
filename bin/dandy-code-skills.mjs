#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] ?? 'help';

const options = parseOptions(args.slice(1));

const TARGETS = {
  agents: {
    label: '.agents',
    source: path.join(repoRoot, '.agents', 'skills'),
    localDestination: cwd => path.join(cwd, '.agents', 'skills'),
    globalDestination: home => path.join(home, '.agents', 'skills'),
  },
  claude: {
    label: 'Claude Code',
    source: path.join(repoRoot, '.claude', 'skills'),
    localDestination: cwd => path.join(cwd, '.claude', 'skills'),
    globalDestination: home => path.join(home, '.claude', 'skills'),
  },
  opencode: {
    label: 'OpenCode',
    source: path.join(repoRoot, '.opencode', 'skills'),
    localDestination: cwd => path.join(cwd, '.opencode', 'skills'),
    globalDestination: home => path.join(home, '.config', 'opencode', 'skills'),
  },
};

if (command === 'install') {
  install(options);
} else {
  printHelp();
}

function install(options) {
  const selectedTargets = getSelectedTargets(options.target);
  const root = options.path ? path.resolve(options.path) : process.cwd();
  const home = os.homedir();
  const isGlobal = Boolean(options.global);
  const dryRun = Boolean(options.dryRun);
  const force = options.force !== false;

  console.log(`Dandy Code Skills installer`);
  console.log(`Mode: ${isGlobal ? 'global' : 'local'}`);
  console.log(`Targets: ${selectedTargets.join(', ')}`);
  console.log('');

  for (const targetName of selectedTargets) {
    const target = TARGETS[targetName];
    const destination = isGlobal
      ? target.globalDestination(home)
      : target.localDestination(root);

    copyDirectory(target.source, destination, { dryRun, force });
    console.log(`${dryRun ? 'Would install' : 'Installed'} ${target.label}: ${destination}`);
  }

  console.log('');
  console.log('Done. Use /dandy-review, /dandy-commit, /dandy-breakdown, or mention dandy-style in your task.');
}

function copyDirectory(source, destination, { dryRun, force }) {
  if (!fs.existsSync(source)) {
    throw new Error(`Source directory does not exist: ${source}`);
  }

  if (dryRun) {
    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });

  if (fs.existsSync(destination) && force) {
    fs.rmSync(destination, { recursive: true, force: true });
  }

  fs.cpSync(source, destination, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });
}

function getSelectedTargets(targetOption) {
  if (!targetOption || targetOption === 'all') {
    return Object.keys(TARGETS);
  }

  const targets = String(targetOption)
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

  for (const target of targets) {
    if (!TARGETS[target]) {
      throw new Error(`Unknown target: ${target}. Available targets: all, ${Object.keys(TARGETS).join(', ')}`);
    }
  }

  return targets;
}

function parseOptions(rawArgs) {
  const parsed = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === '--global' || arg === '-g') {
      parsed.global = true;
      continue;
    }

    if (arg === '--dry-run') {
      parsed.dryRun = true;
      continue;
    }

    if (arg === '--no-force') {
      parsed.force = false;
      continue;
    }

    if (arg === '--target' || arg === '-t') {
      parsed.target = rawArgs[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--target=')) {
      parsed.target = arg.slice('--target='.length);
      continue;
    }

    if (arg === '--path' || arg === '-p') {
      parsed.path = rawArgs[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--path=')) {
      parsed.path = arg.slice('--path='.length);
      continue;
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`Dandy Code Skills

Usage:
  dandy-code-skills install [options]

Options:
  --target <all|agents|claude|opencode>   Install one or more targets. Comma-separated values are supported.
  --path <path>                           Project path for local install. Defaults to current directory.
  --global, -g                            Install into user-level agent directories.
  --dry-run                               Show what would be installed.
  --no-force                              Do not remove existing target directories first.

Examples:
  dandy-code-skills install
  dandy-code-skills install --target claude
  dandy-code-skills install --target agents,claude
  dandy-code-skills install --global
  dandy-code-skills install --path /path/to/project
`);
}
