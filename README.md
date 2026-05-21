# Dandy Code Agent Skills

This directory contains practical skills for codex-style AI agents working with PHP and Laravel code.

The set is inspired by the Russian book “Денди-код” / “Практики, которые переведут код из «работает» в «вызывающий уважение»”. It does not retell the book. It turns its ideas into operational instructions for review, refactoring, and code generation.

## Purpose

Use these skills to help an agent make code more readable, predictable, honest, low-noise, and safe to maintain without changing business logic by accident.

## How to use

- Keep `.agents/skills` as the source of truth for multi-agent setups.
- Copy compatible skills to `.claude/skills` for Claude Code.
- Copy compatible skills to `.opencode/skills` for OpenCode.
- For Pi or another agent, copy each skill directory into that agent's skill/plugin directory if it supports `SKILL.md`-style instructions.

## Recommended order

1. Use `ai-generated-code-sanity-check` when the code was written by an AI agent.
2. Use `dandy-code-review` for a broad first pass.
3. Use targeted skills for concrete problems: naming, conditions, early returns, arguments, magic values, comments, exceptions, or testability.
4. Use `laravel-dandy-pass` for Laravel-specific placement and convention decisions.
5. Use `readability-refactor` only when the user wants behavior-preserving cleanup.

## Skills

- `dandy-code-review` — broad practical review for readability, neatness, names, noise, nesting, and maintainability.
- `readability-refactor` — behavior-preserving cleanup of structure, ordering, and visual noise.
- `naming-cleanup` — improvement of vague or dishonest names in PHP/Laravel code.
- `early-return-simplifier` — reduction of nesting with guard clauses and early exits.
- `condition-simplifier` — simplification of complex boolean expressions and branching.
- `magic-value-extractor` — extraction of meaningful domain values without constant spam.
- `comments-curator` — removal or rewriting of comments so they explain why, not what.
- `argument-signature-review` — review of long signatures, flags, nullable clutter, and unstructured arrays.
- `exception-flow-review` — review of exception handling, logging, messages, and swallowed errors.
- `testability-pass` — minimal refactoring that makes behavior easier to test with Pest/PHPUnit.
- `ai-generated-code-sanity-check` — sanity review for AI-written code and project-style drift.
- `laravel-dandy-pass` — Laravel-specific application of low-noise, convention-first code practices.

## Verification

After changes, prefer project tools over opinion: Laravel Pint or PSR-12 for formatting, Pest/PHPUnit for tests, and static analysis if the project already uses it.
