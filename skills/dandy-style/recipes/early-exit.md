# Recipe: Early Exit

## Problem

The happy path is hidden inside nested conditions or loops.

## Bad signs

- Main action is indented two or more levels.
- `else` after `return`, `throw`, `continue`, or `break`.
- Validation/authorization wraps the whole method.

## Before

```php
if ($condition) {
    foreach ($users as $user) {
        if ($user->isActive()) {
            $this->notify($user);
        }
    }
}
```

## After

```php
if (! $condition) {
    return;
}

foreach ($users as $user) {
    if (! $user->isActive()) {
        continue;
    }

    $this->notify($user);
}
```

## How to fix

1. Find the main successful scenario.
2. Move invalid, empty, denied, or already-handled cases to the top.
3. Exit early.
4. Remove useless `else`.
5. Re-check side effects, transactions, and cleanup.

## When not to apply

- A balanced `if/else` is clearer.
- Cleanup/finalization may be skipped.
- Reordering guards changes behavior.

## Related recipes

- `conditions.md`
- `size.md`
- `exceptions.md`
