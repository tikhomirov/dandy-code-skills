# Recipe: Naming

## Problem

Names hide real domain meaning and force the reader to decode placeholders, abbreviations, or translit.

## Bad signs

- `$data`, `$result`, `$item`, `$tmp` outside tiny scopes.
- Generic `Manager`, `Helper`, `Handler`, `Service`.
- `process()`, `run()`, `handleData()` on broad objects.
- Boolean names that do not read as yes/no questions.

## Before

```php
$usr = User::find($id);

if ($usr->st === 1) {
    $svc->run($usr);
}
```

## After

```php
$user = User::query()->findOrFail($id);

if ($user->isActive()) {
    $activationService->activate($user);
}
```

## How to fix

1. Inspect nearby project vocabulary.
2. Identify what the value or behavior really means.
3. Rename in the smallest safe scope.
4. Prefer domain nouns and intention-revealing verbs.
5. For booleans prefer `is`, `has`, `can`, `should`, `allows`, `requires`.

## When not to apply

- A short local variable is obvious in a tiny scope.
- Public API rename is risky and not requested.
- The name follows a consistent project convention.

## Related recipes

- `magic-values.md`
- `comments.md`
- `laravel-way.md`
