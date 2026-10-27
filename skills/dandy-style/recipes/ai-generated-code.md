# Recipe: AI Generated Code

## Problem

AI output looks plausible but may ignore project conventions, duplicate existing code, or add abstractions.

## Bad signs

- New pattern appears without matching the project.
- Helper/service/repository duplicates existing code.
- Interface for one class just in case.
- Comments claim security/performance without evidence.
- Generated code changes behavior outside scope.

## Before

```php
class UserRepository
{
    public function getActiveUsers(): Collection
    {
        return User::where('active', true)->get();
    }
}
```

## After

```php
$users = User::query()->active()->get();
```

## How to fix

1. Inspect nearby files before editing.
2. Search for existing classes/patterns.
3. Remove speculative abstractions and unused code.
4. Check naming, validation, exceptions, tests, Laravel conventions.
5. Run formatters/tests when available.

## When not to apply

- Change is tiny and mechanical.
- User asked only for syntax correction.
- No project context is available.

## Related recipes

- `no-nonsense.md`
- `laravel-way.md`
- `comments.md`
- `tests.md`
