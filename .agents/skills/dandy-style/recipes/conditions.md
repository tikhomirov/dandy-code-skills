# Recipe: Conditions

## Problem

A decision is correct for the machine but hard for a human to parse.

## Bad signs

- Long `if` with mixed `&&` and `||`.
- Double negatives.
- Nested ternaries.
- Same business condition repeated.

## Before

```php
if (! $user->isBlocked() && ! $user->isDeleted() && in_array($user->role, ['admin', 'owner'], true)) {
    return true;
}
```

## After

```php
if ($user->canManageWorkspace($workspace)) {
    return true;
}
```

## How to fix

1. Say the decision in plain language.
2. Prefer positive wording.
3. Extract a named predicate only when the name adds meaning.
4. Use `match` for value-to-result mapping.
5. Add branch tests for business rules.

## When not to apply

- Inline comparison is clearer.
- Extraction hides a side effect.
- Performance-sensitive code needs measurement first.

## Related recipes

- `early-exit.md`
- `naming.md`
- `tests.md`
