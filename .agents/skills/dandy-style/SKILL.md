---
name: dandy-style
description: Apply Dandy Code / dandy-style principles to PHP/Laravel work; chapter-derived router for README, style, breathing, naming, nesting, comments, magic values, Laravel-way, tests, and AI-generated code recipes.
---

# Dandy Style

## Purpose

Core router for Dandy Code rules. Use it to apply the book's practical recipes to the current task without turning every request into a full audit.

## Source discipline

This skill must stay close to the book. First use `source-map.md`, then `recipe-map.md`. Do not replace chapter-derived recipes with generic clean-code advice.

If advice is not clearly connected to a recipe, label it as an extra recommendation.

## Invocation modes

### Direct invocation

Use when the user calls `/dandy-style` or asks to improve code by Dandy Code rules without a narrower workflow.

Ask what area hurts if unclear: README/onboarding, project structure, module, diff, method, naming, Laravel-way, AI-generated code, tests, or general readability. Then inspect only relevant context, read `source-map.md` and `recipe-map.md`, select recipes, and return a focused review/plan/fix.

### Contextual invocation

Use when the user mentions Dandy Code or asks to apply the style inside another task, for example:

- `use Dandy Code style`;
- `use dandy style`;
- `apply Dandy Code rules`;
- `используй денди стиль`;
- `сделай в денди-стиле`;
- `отрефактори как денди`;
- `по правилам Денди-кода`;
- `разбери как денди`.

Keep the original task primary. Do not start a full project review. Do not scan unrelated files. Load at most 1-3 relevant recipes.

## Token discipline

- Direct broad review: read this file, `source-map.md`, and `recipe-map.md`.
- Contextual task: read this file and `recipe-map.md`; load only matching recipes.
- Do not load all recipes.
- Load examples only when editing code or explaining a concrete transformation.
- Do not quote the book.
- Stop at the requested scope.

## Core rules

- A project starts with a useful README.
- Code is communication: optimize for the next reader.
- Project style beats personal taste.
- Laravel-way beats custom architecture unless the project intentionally differs.
- Names must tell the truth.
- Keep the happy path visible.
- Remove noise before adding abstractions.
- Comments explain why, not what.
- Extract meaning from magic values, not constants for their own sake.
- Treat AI code as plausible but untrusted.
- Keep refactors small, behavior-preserving, and verifiable.

## Output

Separate book-derived findings from extra recommendations. Name only recipes actually used.
