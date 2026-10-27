# Recipe: Remove

## Source

Based on `content/016-remove.md`: unnecessary code is not harmless. It becomes noise and false history.

## Problem

The project keeps code that no longer works for the reader: dead branches, commented blocks, backups, unused helpers, old configs, and placeholders.

## Bad signs

- Commented-out code.
- Files named `old`, `bak`, `final`, `new2`.
- Unused classes, imports, methods, migrations, routes, configs.
- TODOs that no one can act on.
- Alternative implementations kept “just in case”.

## Before

```php
// $user->notify(new OldWelcomeNotification());
$user->notify(new WelcomeNotification());
```

## After

```php
$user->notify(new WelcomeNotification());
```

## How to fix

1. Verify usage with search/tests/static analysis.
2. Delete commented-out code.
3. Delete unused imports/classes/configs if safe.
4. Move historical context to git history or issue tracker, not source code.
5. Keep removal separate from behavior changes when possible.

## When not to apply

- Code is intentionally kept behind a feature flag.
- Legal/audit/history requirements demand keeping it.
- Usage cannot be verified safely.

## Related recipes

- `comments.md`
- `no-nonsense.md`
- `ai-generated-code.md`
