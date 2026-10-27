# Recipe: Code Breath

## Source

Based on `content/006-code-breath.md`: code should have visual breathing room. A reader should see groups of meaning, not a wall.

## Problem

Even correct code becomes hard to read when unrelated actions are glued together.

## Bad signs

- Long dense blocks with no blank lines between conceptual steps.
- Blank lines used randomly instead of grouping meaning.
- Setup, decision, action, and response are visually mixed.

## Before

```php
$user = User::findOrFail($id);
$this->authorize('update', $user);
$data = $request->validated();
$user->update($data);
return redirect()->route('users.show', $user);
```

## After

```php
$user = User::query()->findOrFail($id);

$this->authorize('update', $user);

$user->update($request->validated());

return redirect()->route('users.show', $user);
```

## How to fix

1. Identify conceptual steps.
2. Add blank lines between steps, not between every line.
3. Keep tightly related lines together.
4. Prefer extraction only when spacing is not enough.

## When not to apply

- Formatter/project style forbids the proposed spacing.
- Blank lines hide that a method is doing too much; then use `size.md`.

## Related recipes

- `code-style.md`
- `size.md`
- `early-exit.md`
