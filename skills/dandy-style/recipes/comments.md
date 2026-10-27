# Recipe: Comments

## Problem

Comments add noise, repeat code, or become stale.

## Bad signs

- `// create user` above `User::create()`.
- `// increment counter` above `$count++`.
- Vague `TODO fix later`.
- Comment contradicts code.

## Before

```php
// Check if user is admin
if ($user->isAdmin()) {
    return true;
}
```

## After

```php
if ($user->isAdmin()) {
    return true;
}
```

## How to fix

1. Delete comments that narrate code.
2. Rename/extract when code can explain itself.
3. Keep comments explaining business, provider, legal, performance, or historical reasons.
4. Rewrite TODO/FIXME/HACK into concrete action.

## When not to apply

- Public API docs are required.
- Removing the comment loses external context.
- The real problem is structure, not wording.

## Related recipes

- `naming.md`
- `no-nonsense.md`
- `ai-generated-code.md`
