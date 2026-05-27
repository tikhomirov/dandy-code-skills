# Changelog

## Unreleased

### Changed

- `dandy-style` is now shorter and more behavior-oriented: it starts from project/task context, then selects only relevant recipes.
- Installer now treats `.agents/skills` as the only canonical skills source.
- Claude Code and OpenCode targets now receive symlinks to canonical `.agents/skills` entries instead of separate wrapper skills.
- npm package contents no longer include duplicated `.claude/skills` and `.opencode/skills` trees.

### Removed

- Removed duplicated Claude Code wrapper skills from `.claude/skills`.
- Removed duplicated OpenCode wrapper skills from `.opencode/skills`.

## 2.1.0

### Added

- Interactive installer mode.
- Prompt to choose installation mode: project or global.
- Prompt to choose project directory for local install.
- Prompt to choose target agent: all, `.agents`, Claude Code, or OpenCode.
- Prompt to clean old Dandy skills before install.
- `--yes` flag for non-interactive default install.
- `--no-clean` flag to skip cleanup.

### Changed

- Installer now removes only Dandy-owned skill entries before copying the new version.
- Installer no longer deletes the whole `skills` directory, so custom user skills should remain safe.
- README now documents interactive installation and non-interactive examples.

## 2.0.0

### Added

- Four public entrypoint skills:
  - `dandy-style`
  - `dandy-review`
  - `dandy-commit`
  - `dandy-breakdown`
- Chapter-derived recipe map based on the original **«Денди-код»** book.
- Source map from book chapters to agent recipes.
- Cross-platform Node.js installer.
- Local and global installation modes.
- Agent targets:
  - `.agents`
  - Claude Code
  - OpenCode
- English/Russian README.
- README logo, badges, and links to the book repository and PDF.

### Changed

- Reworked the package from many topic skills into four practical user workflows plus internal recipes.
- Rewrote Russian examples to sound natural: “в денди-стиле”, “как денди”, “по правилам Денди-кода”.
- Reduced README prose and moved installation / quick start closer to the top.

### Notes

This release is the first stable v2 structure for practical use with AI coding agents.
