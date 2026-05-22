---
name: dandy-breakdown
description: Analyze and improve a specific PHP/Laravel code fragment, method, class, file, or pasted snippet using Dandy Code recipes; use for local explanation, refactor suggestions, and minimal safe cleanup.
---

# Dandy Breakdown

## Purpose

Explain what selected code does, why it is hard to read, and how to improve it with the smallest useful Dandy Code recipes.

## Invocation modes

### Direct invocation

Use when the user calls `/dandy-breakdown` or asks to break down a method, class, file, or snippet.

Identify the selected code, explain what it does, read `../dandy-style/recipe-map.md`, load only recipes matching local smells, suggest a minimal safe improvement, and optionally provide a deeper refactor path.

### Contextual invocation

Use when the user says to “разобрать по Денди-коду” inside another task. Analyze only selected code, keep original task primary, and load at most 1-3 recipes.

## Workflow

1. State apparent responsibility.
2. Identify readability blockers.
3. Map blockers to recipes.
4. Separate behavior risks, readability smells, Laravel-way issues, optional polish.
5. Show minimal safe refactor.
6. Explain what not to touch.

## Output

```text
## What this code does
## What hurts readability
## Recipes used
## Minimal safe improvement
## Deeper refactor, optional
## What not to touch
```

## Hard rules

Do not rewrite more than the selected scope unless asked. Do not invent abstractions for a small snippet. Preserve behavior. If behavior is unclear, say what must be tested before refactoring.
