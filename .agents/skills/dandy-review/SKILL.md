---
name: dandy-review
description: Review PHP/Laravel project, module, file, or diff using Dandy Code chapter-derived recipes; start with README/onboarding, then style, readability, Laravel-way, tests, and safe cleanup.
---

# Dandy Review

## Purpose

Review a project, module, file, or diff according to Dandy Code and Laravel-way. `/dandy-start` is an alias for onboarding mode.

This skill must stay close to the book. It should use `../dandy-style/source-map.md` and `../dandy-style/recipe-map.md`, not invent a generic clean-code checklist.

## Invocation modes

### Direct invocation

Use when the user calls `/dandy-review`, `/dandy-start`, or asks to review code by Dandy Code.

If the target is unclear, ask where the user sees pain: README/onboarding, project structure, controllers, services, AI code, tests, Laravel-way, module structure, or general readability.

Then inspect relevant files only, read `../dandy-style/source-map.md` and `../dandy-style/recipe-map.md`, load recipes for detected smells, and return a prioritized review. Apply changes only if asked.

### Contextual invocation

Use when the user asks another task and says to use review/Dandy Code style. Keep the original task primary, review only the requested scope, and load at most 1-3 recipes.

## Modes

- `onboarding` — start with README, setup, tests, structure, owners.
- `module` — one bounded feature area.
- `file` — selected files.
- `diff` — changed files only.
- `plan-only` — refactor plan without edits.
- `fix-safe` — small behavior-preserving changes if requested.

## Workflow

1. Identify scope and mode.
2. For onboarding/project review, check README first: description, setup, test data, tests, structure, owners.
3. Detect conventions: Laravel version, Pint, tests, static analysis, architecture patterns.
4. Inspect nearby code before judging style.
5. Map smells through `dandy-style/source-map.md` and `dandy-style/recipe-map.md`.
6. Prioritize by the book order: entrypoint, style, readability, flow, correctness support, cleanup.
7. Recommend the smallest safe next step.

## Output

```text
## Scope
## Summary
## Findings
1. Project entrypoint / README
2. Code style and visual readability
3. Dandy Code readability issues
4. Laravel-way issues
5. Tests and confidence
6. Cleanup / removal

## Quick wins
## Suggested plan
## Recipes used
```

## Hard rules

Do not change business behavior unless asked. Do not rewrite the whole module during review. Prefer concrete file/path examples over abstract advice. If a finding is not connected to a book recipe, label it as extra, not Dandy Code.
