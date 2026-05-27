#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const canonicalSource = path.join(repoRoot, '.agents', 'skills');

const args = process.argv.slice(2);
const command = args[0] ?? 'help';
const options = parseOptions(args.slice(1));

const TARGETS = {
  agents: {
    label: '.agents',
    type: 'copy',
    localDestination: cwd => path.join(cwd, '.agents', 'skills'),
    globalDestination: home => path.join(home, '.agents', 'skills'),
  },
  claude: {
    label: 'Claude Code',
    type: 'symlink',
    localDestination: cwd => path.join(cwd, '.claude', 'skills'),
    globalDestination: home => path.join(home, '.claude', 'skills'),
  },
  opencode: {
    label: 'OpenCode',
    type: 'symlink',
    localDestination: cwd => path.join(cwd, '.opencode', 'skills'),
    globalDestination: home => path.join(home, '.config', 'opencode', 'skills'),
  },
};

const DANDY_OWNED_ENTRIES = [
  'README.md',
  'dandy-code-principles.md',
  'dandy-style',
  'dandy-review',
  'dandy-commit',
  'dandy-breakdown',
  'dandy-code-review',
  'readability-refactor',
  'naming-cleanup',
  'early-return-simplifier',
  'condition-simplifier',
  'magic-value-extractor',
  'comments-curator',
  'argument-signature-review',
  'exception-flow-review',
  'testability-pass',
  'ai-generated-code-sanity-check',
  'laravel-dandy-pass',
];

try {
  if (command === 'install') {
    await install(options);
  } else {
    printHelp();
  }
} catch (error) {
  console.error(`\nError: ${error.message}`);
  process.exitCode = 1;
}

async function install(options) {
  const interactiveOptions = await maybeAskInteractiveOptions(options);
  const selectedTargets = getSelectedTargets(interactiveOptions.target);
  const root = interactiveOptions.path ? path.resolve(interactiveOptions.path) : process.cwd();
  const home = os.homedir();
  const isGlobal = Boolean(interactiveOptions.global);
  const dryRun = Boolean(interactiveOptions.dryRun);
  const clean = interactiveOptions.clean !== false && interactiveOptions.force !== false;
  const canonicalDestination = getDestination(TARGETS.agents, { root, home, isGlobal });

  if (!fs.existsSync(canonicalSource)) {
    throw new Error(`Canonical source directory does not exist: ${canonicalSource}`);
  }

  console.log(`Dandy Code Skills installer`);
  console.log(`Mode: ${isGlobal ? 'global' : 'project'}`);

  if (!isGlobal) {
    console.log(`Project path: ${root}`);
  }

  console.log(`Targets: ${selectedTargets.join(', ')}`);
  console.log(`Canonical skills: ${canonicalDestination}`);
  console.log(`Cleanup old Dandy skills: ${clean ? 'yes' : 'no'}`);
  console.log('');

  installCanonicalSkills(canonicalDestination, { dryRun, clean });

  for (const targetName of selectedTargets) {
    if (targetName === 'agents') {
      continue;
    }

    const target = TARGETS[targetName];
    const destination = getDestination(target, { root, home, isGlobal });

    installLinkedTarget(canonicalDestination, destination, { dryRun, clean });
    console.log(`${dryRun ? 'Would link' : 'Linked'} ${target.label}: ${destination}`);
  }

  console.log('');
  console.log('Done. Canonical skills live in .agents/skills; Claude/OpenCode targets link to them.');
  console.log('Use /dandy-style, /dandy-commit, or mention Dandy Code in your task.');
}

async function maybeAskInteractiveOptions(options) {
  const hasExplicitMode = Boolean(options.global || options.local || options.path);
  const shouldAsk = process.stdin.isTTY
    && process.stdout.isTTY
    && !options.yes
    && !options.dryRun
    && !hasExplicitMode;

  if (!shouldAsk) {
    return options;
  }

  const rl = readline.createInterface({ input, output });

  try {
    const modeAnswer = await ask(rl, 'Install where? [project/global] (project): ');
    const mode = normalizeAnswer(modeAnswer, 'project');
    const nextOptions = { ...options };

    if (mode === 'global' || mode === 'g') {
      nextOptions.global = true;
    } else {
      nextOptions.local = true;
      const pathAnswer = await ask(rl, `Project directory (${process.cwd()}): `);
      nextOptions.path = normalizeAnswer(pathAnswer, process.cwd());
    }

    if (!nextOptions.target) {
      const targetAnswer = await ask(rl, 'Install targets [all/agents/claude/opencode] (all): ');
      nextOptions.target = normalizeAnswer(targetAnswer, 'all');
    }

    if (nextOptions.clean === undefined && nextOptions.force === undefined) {
      const cleanAnswer = await ask(rl, 'Remove old Dandy skills first? [Y/n] (Y): ');
      nextOptions.clean = !['n', 'no', 'нет'].includes(normalizeAnswer(cleanAnswer, 'y').toLowerCase());
    }

    return nextOptions;
  } finally {
    rl.close();
  }
}

async function ask(rl, question) {
  return (await rl.question(question)).trim();
}

function normalizeAnswer(answer, fallback) {
  return answer === '' ? fallback : answer;
}

function getDestination(target, { root, home, isGlobal }) {
  return isGlobal
    ? target.globalDestination(home)
    : target.localDestination(root);
}

function installCanonicalSkills(destination, { dryRun, clean }) {
  if (path.resolve(canonicalSource) === path.resolve(destination)) {
    console.log(`Canonical source and destination are the same, skipping copy: ${destination}`);
    return;
  }

  if (dryRun) {
    if (clean) {
      logCleanupPlan(destination);
    }

    for (const entry of fs.readdirSync(canonicalSource)) {
      console.log(`Would copy canonical: ${path.join(canonicalSource, entry)} -> ${path.join(destination, entry)}`);
    }

    return;
  }

  fs.mkdirSync(destination, { recursive: true });

  if (clean) {
    removeOldDandyEntries(destination);
  }

  copyDirectoryContents(canonicalSource, destination);
  console.log(`Installed canonical .agents: ${destination}`);
}

function installLinkedTarget(canonicalDestination, destination, { dryRun, clean }) {
  if (dryRun) {
    if (clean) {
      logCleanupPlan(destination);
    }

    for (const entry of fs.readdirSync(canonicalSource)) {
      console.log(`Would symlink: ${path.join(destination, entry)} -> ${path.join(canonicalDestination, entry)}`);
    }

    return;
  }

  fs.mkdirSync(destination, { recursive: true });

  if (clean) {
    removeOldDandyEntries(destination);
  }

  linkDirectoryContents(canonicalDestination, destination, { clean });
}

function logCleanupPlan(destination) {
  for (const entry of DANDY_OWNED_ENTRIES) {
    const ownedPath = path.join(destination, entry);
    if (fs.existsSync(ownedPath)) {
      console.log(`Would remove old Dandy entry: ${ownedPath}`);
    }
  }
}

function removeOldDandyEntries(destination) {
  for (const entry of DANDY_OWNED_ENTRIES) {
    const ownedPath = path.join(destination, entry);

    if (pathExistsOrSymlink(ownedPath)) {
      fs.rmSync(ownedPath, { recursive: true, force: true });
    }
  }
}

function pathExistsOrSymlink(value) {
  return fs.existsSync(value) || Boolean(fs.lstatSync(value, { throwIfNoEntry: false })?.isSymbolicLink());
}

function copyDirectoryContents(source, destination) {
  for (const entry of fs.readdirSync(source)) {
    const from = path.join(source, entry);
    const to = path.join(destination, entry);

    fs.cpSync(from, to, {
      recursive: true,
      force: true,
      errorOnExist: false,
      dereference: false,
    });
  }
}

function linkDirectoryContents(canonicalDestination, destination, { clean }) {
  for (const entry of fs.readdirSync(canonicalDestination)) {
    const from = path.join(canonicalDestination, entry);
    const to = path.join(destination, entry);

    if (pathExistsOrSymlink(to)) {
      if (!clean) {
        throw new Error(`Cannot create symlink because destination already exists: ${to}. Re-run without --no-clean.`);
      }

      fs.rmSync(to, { recursive: true, force: true });
    }

    const relativeTarget = path.relative(path.dirname(to), from);
    const type = fs.statSync(from).isDirectory()
      ? (process.platform === 'win32' ? 'junction' : 'dir')
      : 'file';

    fs.symlinkSync(relativeTarget, to, type);
  }
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

    if (arg === '--local') {
      parsed.local = true;
      continue;
    }

    if (arg === '--yes' || arg === '-y') {
      parsed.yes = true;
      continue;
    }

    if (arg === '--dry-run') {
      parsed.dryRun = true;
      continue;
    }

    if (arg === '--no-clean' || arg === '--no-force') {
      parsed.clean = false;
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

Interactive mode:
  dandy-code-skills install

Options:
  --target <all|agents|claude|opencode>   Install one or more targets. Comma-separated values are supported.
  --path <path>                           Project path for local install. Defaults to current directory.
  --global, -g                            Install into user-level agent directories.
  --local                                 Install into a project directory.
  --yes, -y                               Skip interactive questions and use defaults.
  --dry-run                               Show what would be installed.
  --no-clean                              Do not remove old Dandy skills first.

Examples:
  dandy-code-skills install
  dandy-code-skills install --yes
  dandy-code-skills install --target claude
  dandy-code-skills install --target agents,claude
  dandy-code-skills install --global
  dandy-code-skills install --path /path/to/project
`);
}
