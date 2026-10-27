# Recipe: No Nonsense

## Problem

Code exists without useful work: ceremony, wrappers, dead branches, future-proofing, or placeholders.

## Bad signs

- Wrapper service only calls one Eloquent method.
- Interface has one implementation and no boundary.
- Dead code remains just in case.
- Abstractions make simple Laravel code harder.

## Before

```php
class UserRepository
{
    public function find(int $id): ?User
    {
        return User::find($id);
    }
}
```

## After

```php
$user = User::query()->findOrFail($id);
```

## How to fix

1. Ask what complexity the code removes today.
2. Remove unused scaffolding.
3. Prefer direct Laravel features when clear.
4. Keep abstractions only for real boundaries or repeated concepts.
5. Verify deletion with tests/search.

## When not to apply

- The abstraction is a deliberate convention.
- It hides an external system or unstable dependency.
- It improves testability meaningfully.

## Related recipes

- `laravel-way.md`
- `ai-generated-code.md`
- `size.md`
