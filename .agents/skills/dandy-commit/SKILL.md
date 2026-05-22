---
name: dandy-commit
description: Check PHP/Laravel git diff before commit using Dandy Code style; use for AI-generated code review, safe cleanup, Pint/tests, commit summary, and commit preparation.
---

# Dandy Commit

## Purpose

Review changed code before commit so AI-generated or rushed changes do not introduce style drift, duplicated patterns, fragile logic, or avoidable noise.

## Invocation modes

### Direct invocation

Use when the user calls `/dandy-commit` or asks to check changes before commit.

Inspect `git status` and `git diff`. Review only changed files plus nearby patterns needed for context. Read `../dandy-style/recipe-map.md`. Load recipes matching diff smells. Apply safe fixes only if requested or mode allows it. Run Pint/tests/static analysis when available and reasonable. Commit only after explicit user approval.

### Contextual invocation

Use when the user mentions Dandy commit rules inside another task. Keep changes small, avoid unrelated cleanup, match project style, treat AI code as untrusted, and do not commit automatically.

## Modes

- `review-only` — report issues only. Default.
- `fix-safe` — apply behavior-preserving cleanup only.
- `fix-and-commit` — fix and commit only when explicitly requested.

## Checklist

- Diff matches local project style.
- No speculative abstractions.
- No duplicate helpers/services/repositories.
- Naming is truthful.
- No obvious magic values introduced.
- No comments narrate obvious code.
- Laravel conventions are respected.
- Tests/checks are suggested or run.
- Commit message describes the real change.

## Output

```text
## Diff summary
## Commit blockers
## Safe fixes
## Optional improvements
## Verification
## Commit message
```

## Hard rules

Do not commit without explicit approval. Do not mix unrelated refactors into the commit. Do not change public behavior just to improve style.
