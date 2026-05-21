---
name: dandy-code-review
description: Use for a practical PHP/Laravel code review focused on readability, neatness, naming, noise, nesting, and maintainability.
---

# Dandy Code Review

## Purpose

Audit PHP/Laravel code for everyday maintainability problems before proposing or approving changes.

## When to use

- Reviewing a diff, PR, generated code, or suspicious legacy code.
- Looking for visual noise, chaotic structure, weak names, magic values, or deep nesting.
- Separating critical problems from readability issues and taste.

## When not to use

- When the user only asks for formatting that Pint can fix.
- When no code context is available.
- When the request is only security, performance, or architecture review.

## Core rules

- First inspect nearby project style and existing patterns.
- Do not change business logic without explicit approval.
- Do not add abstractions unless they remove real complexity today.
- Improve code in small safe steps.
- Separate bugs, risks, readability, and taste.
- Use PSR-12, Laravel Pint, Pest/PHPUnit, and existing static analysis as verification tools.

## Workflow

1. Read the changed files and the closest similar files.
2. Identify each unit's main responsibility.
3. Scan for visual noise, long methods, mixed abstraction levels, weak names, magic values, nesting, and useless comments.
4. Check whether Laravel conventions already solve the problem.
5. Prioritize findings by impact and safety.
6. Suggest tests, static analysis, and Pint after changes.

## Review checklist

- Critical behavior and error-handling risks are listed first.
- Readability issues are concrete and actionable.
- Taste preferences are clearly marked as optional.
- Suggested fixes preserve current behavior.
- Existing project style is respected.

## Output format

1. Critical issues.
2. Readability issues.
3. Small improvements.
4. Taste, if any.
5. What to fix first.

Use file and line references when possible. Keep each finding short: problem, why it matters, safer direction.

## Bad signs

- Large methods with several reasons to change.
- Different abstraction levels in one block.
- Names like `$data`, `$result`, `Helper`, or `Manager` without domain meaning.
- Deep `if/else` pyramids.
- Magic statuses, limits, roles, or string tokens.
- Comments that restate the next line.

## Good signs

- Main path is easy to follow.
- Names reveal domain intent.
- Repeated concepts have explicit names.
- Laravel conventions are used instead of custom ceremony.
- Tests or checks are suggested for risky changes.

## Examples

### Bad

```php
if ($user->status === 1 && $user->role === 'a') {
    // approve user
    $service->approve($user);
}
```

### Better

```php
if ($user->isActiveAdmin()) {
    $approvals->approve($user);
}
```
