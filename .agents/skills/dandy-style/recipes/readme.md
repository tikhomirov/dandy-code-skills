# Recipe: README

## Source

Based on `content/002-readme.md`: the project starts with README. An empty or missing README is a signal that entering the project will be painful.

## Problem

A developer opens the repository and cannot quickly understand what the project does, how to run it, how to test it, where code belongs, or who owns it.

## Bad signs

- No `README.md`.
- README contains only `# ProjectName`.
- Setup commands are missing or untested.
- No seed/reset command for local data.
- No test instructions.
- Directory structure is undocumented.
- No maintainer/owner/contact information.
- Old config backups live near real config: `config_old.php`, `config_bak.php`, `config_real_final.php`.

## Good README sections

Use the smallest useful version of these sections:

1. Project description: what it does and why it exists.
2. Useful links: staging, API docs, CI/CD, coverage, internal docs.
3. Installation and local start: checked commands.
4. Test/demo data: seed/reset/import instructions.
5. Testing: how to run all tests and specific suites.
6. Directory structure: where things live and where new code belongs.
7. Owners: maintainer, contact, status, or link to `CODEOWNERS`.

## Before

```markdown
# Weather
```

## After

```markdown
# Weather

Weather receives weather data over REST API, processes it, and exposes aggregated reports through API and web UI.

## Start

make install
make up
make seed

## Tests

vendor/bin/phpunit

## Structure

- `app/Modules` — business modules.
- `app/Services` — external API and storage integration.
- `routes/api.php` — public API routes.

## Owners

- @ivanov — active maintainer
```

## How to fix

1. Check if README exists and says what the project does.
2. Verify installation/start commands.
3. Verify test commands.
4. Document seed/reset or test data flow.
5. Explain project structure with short comments.
6. Add owner/contact/status or point to `CODEOWNERS`.
7. Remove or explain suspicious backup/config files.

## When not to apply

- Tiny throwaway experiment with no expected reuse.
- README is generated elsewhere and linked clearly.
- Confidential details must stay in internal docs; link to them instead.

## Related recipes

- `code-style.md`
- `remove.md`
- `tests.md`
