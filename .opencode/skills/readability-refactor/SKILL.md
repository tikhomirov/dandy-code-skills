---
name: readability-refactor
description: Use when safely refactoring PHP/Laravel code to improve readability without changing behavior.
---

# Readability Refactor

## Purpose

Make existing code easier to read by reducing noise, separating thoughts, and keeping behavior intact.

## When to use

- A method is hard to scan but already works.
- A controller/action mixes preparation, validation, querying, side effects, and response building.
- The user asks to clean up code without adding features.

## When not to use

- When behavior must change.
- When a larger architecture redesign was not requested.
- When the code is business-critical and untested; first propose a very small safe step.

## Core rules

- Preserve observable behavior.
- Refactor in small reversible steps.
- Do not introduce new layers unless they reduce real complexity.
- Separate data preparation from action.
- Respect current project style.
- Let Pint handle formatting; focus on structure and readability.

## Workflow

1. Find the current responsibility and golden path.
2. Identify tests or manual checks that protect behavior.
3. Split unrelated thoughts with clear variables or private methods.
4. Move edge cases upward with guards where it helps.
5. Rename only when the new name is more honest.
6. Run Pint and relevant Pest/PHPUnit tests when available.

## Review checklist

- No business rules changed.
- Diff is smaller than a rewrite.
- The main scenario is more visible.
- Temporary variables describe concepts, not mechanics.
- Tests or manual verification are stated.

## Output format

- State what was simplified.
- State what was intentionally left unchanged.
- Mention verification commands to run.
- Keep the response focused on the smallest useful change.

## Bad signs

- One method parses, validates, queries, mutates, notifies, and renders.
- Extraction into services just to make code look layered.
- Query behavior changes in a readability-only refactor.
- Abstractions added for possible future use.

## Good signs

- Small methods with one level of abstraction.
- The method reads top to bottom.
- No speculative architecture.
- Business vocabulary is more visible.

## Examples

### Bad

```php
public function store(Request $request)
{
    $data = $request->all();
    $user = User::create($data);
    Mail::to($user)->send(new WelcomeMail($user));

    return redirect()->route('users.show', $user);
}
```

### Better

```php
public function store(StoreUserRequest $request)
{
    $user = User::create($request->validated());

    Mail::to($user)->send(new WelcomeMail($user));

    return redirect()->route('users.show', $user);
}
```
