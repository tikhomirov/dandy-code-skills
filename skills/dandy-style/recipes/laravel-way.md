# Recipe: Laravel Way

## Problem

Laravel code becomes noisy because it ignores framework conventions or adds custom architecture too early.

## Bad signs

- Manual validation repeated in controllers.
- Permission checks copied instead of Policy/Gate.
- Services only wrap simple Eloquent calls.
- Fat Livewire render methods.
- Blade contains business rules.

## Before

```php
public function store(Request $request)
{
    $data = $request->validate(['title' => ['required']]);

    Post::create($data);
}
```

## After

```php
public function store(StorePostRequest $request)
{
    Post::create($request->validated());
}
```

## How to fix

1. Inspect local conventions.
2. Use FormRequest for HTTP validation when it clarifies.
3. Use Policies/Gates for repeated authorization.
4. Use scopes for repeated query concepts.
5. Use Actions/Services only for real multi-step use cases.
6. Let Pint settle formatting.

## When not to apply

- Project deliberately uses another consistent architecture.
- Code is framework-agnostic library.
- Custom layer hides a real external boundary.

## Related recipes

- `size.md`
- `no-nonsense.md`
- `naming.md`
- `tests.md`
