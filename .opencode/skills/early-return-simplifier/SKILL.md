---
name: early-return-simplifier
description: Use to reduce PHP/Laravel nesting with guard clauses, early return, continue, break, or exceptions when it improves clarity.
---

# Early Return Simplifier

## Purpose

Keep the main scenario at the top level and move invalid or already-handled cases out of the way.

## When to use

- Code has deep `if/else` nesting.
- A method hides the happy path inside several conditions.
- Loops contain large nested blocks.
- The user asks to make a function read top to bottom.

## When not to use

- When a single balanced `if/else` is clearer.
- When early returns would scatter cleanup or transaction handling.
- When changing flow could alter side effects.

## Core rules

- Use guards for invalid, unauthorized, empty, or already-handled cases.
- Do not apply early return mechanically.
- Remove `else` after `return`, `throw`, `continue`, or `break`.
- Keep transaction boundaries, `finally`, and cleanup safe.
- Preserve Laravel response and exception conventions.
- Do not change business logic without explicit approval.

## Workflow

1. Find the main successful path.
2. List edge cases that can exit early.
3. Move edge cases to the top in stable order.
4. Flatten `else` blocks only when the previous branch exits.
5. Check behavior with tests or targeted manual scenarios.

## Review checklist

- The happy path has less indentation.
- Exit conditions are named or obvious.
- Cleanup, logging, events, and transactions are not skipped.
- The method still reads in business order.
- The change is small and safe.

## Output format

- Explain which nesting was removed.
- State why the flow remains safe.
- Mention cases covered by guards.
- Suggest tests for each guard when behavior is important.

## Bad signs

- Three or more nested levels for validation and permissions.
- `else` after `return` or `throw`.
- Main action at the bottom of a pyramid.
- Loop bodies dominated by negative conditions.

## Good signs

- Guard clauses at the top.
- Main action visible without scrolling.
- `continue` skips irrelevant loop items.
- Exceptions are used for exceptional invalid states, not routine branching.

## Examples

### Bad

```php
if ($user) {
    if ($user->isActive()) {
        return $this->dashboard($user);
    }
}

return redirect()->route('login');
```

### Better

```php
if (! $user || ! $user->isActive()) {
    return redirect()->route('login');
}

return $this->dashboard($user);
```
