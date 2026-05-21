---
name: condition-simplifier
description: Use to simplify complex PHP/Laravel conditions, boolean expressions, negations, ternaries, and branching.
---

# Condition Simplifier

## Purpose

Turn hard-to-parse conditions into named, testable, readable decisions.

## When to use

- An `if` contains many boolean operators.
- Negative conditions are stacked.
- Nested ternaries or clever assignments hide intent.
- `match` or a named predicate would read better.
- Query conditions are duplicated across Laravel code.

## When not to use

- When extraction would create a misleading method.
- When a simple inline comparison is clearer.
- When performance-critical code needs measured changes first.

## Core rules

- Prefer positive conditions when they read naturally.
- Name domain decisions, not syntax fragments.
- Avoid assignments inside conditions.
- Use `match` for clear value-to-result mapping.
- Extract conditions only when the name adds meaning.
- Do not hide important side effects inside predicates.

## Workflow

1. Describe the decision in plain language.
2. Break compound conditions into named variables or methods.
3. Remove double negatives where possible.
4. Replace nested ternaries with `if`, `match`, or small methods.
5. Add tests for branches if conditions encode business rules.

## Review checklist

- A reader can say what the condition means without parsing operators.
- Names are truthful and domain-focused.
- No side effects moved into surprising places.
- Branches remain complete and explicit.
- Pint/PSR-12 handles formatting, not the review discussion.

## Output format

- Show the simplified condition and name choices.
- Call out behavior-sensitive branches.
- Suggest branch tests when missing.
- Label optional readability-only changes as optional.

## Bad signs

- Long conditions with mixed `&&` and `||`.
- Nested ternaries in controllers, Blade, or Livewire components.
- Assignments inside `if`.
- Repeated query predicates across files.
- Hard-to-read negative logic.

## Good signs

- `if ($user->canManageWorkspace($workspace))`.
- `match ($status)` for status mapping.
- Named Eloquent scopes for repeated query predicates.
- One business decision per predicate.

## Examples

### Bad

```php
if (! $user->isBlocked() && ! $user->isDeleted() && in_array($user->role, ['admin', 'owner'], true)) {
    // ...
}
```

### Better

```php
if ($user->canManageWorkspace($workspace)) {
    // ...
}
```
