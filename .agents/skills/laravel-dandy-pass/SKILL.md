---
name: laravel-dandy-pass
description: Use to apply readable, low-noise Dandy Code principles to Laravel controllers, requests, actions, services, jobs, models, Blade, Livewire, policies, and commands.
---

# Laravel Dandy Pass

## Purpose

Keep Laravel code expressive by using framework conventions instead of unnecessary custom architecture.

## When to use

- Reviewing or writing Laravel application code.
- A controller, FormRequest, Action, Service, Job, Policy, Model, Query Builder, Livewire component, Blade view, Notification, or Command feels noisy.
- Deciding whether to use Laravel conventions or custom abstractions.

## When not to use

- When the project is not Laravel.
- When a deliberate project architecture already differs and is consistent.
- When a low-level PHP library should stay framework-agnostic.

## Core rules

- Laravel-way is usually better than extra architecture.
- Use FormRequest for HTTP validation when it clarifies controllers.
- Use Policies for authorization instead of scattered permission checks.
- Use Actions/Services only when they reduce real complexity.
- Use Eloquent scopes for repeated query conditions.
- Use enums for statuses and types when supported by the project.
- Laravel Pint should settle formatting instead of manual whitespace debates.

## Workflow

1. Inspect existing Laravel patterns in nearby modules.
2. Place validation, authorization, querying, side effects, and rendering in conventional locations.
3. Remove custom layers that only wrap Laravel without adding meaning.
4. Extract repeated query logic to scopes when it appears in multiple places.
5. Keep Blade and Livewire readable by moving real decisions to named methods where helpful.
6. Verify with Pint and Pest/PHPUnit or Laravel feature tests.

## Review checklist

- Controller action is thin enough to read.
- Validation and authorization are not duplicated.
- Eloquent queries are expressive and not over-wrapped.
- Jobs and listeners have one clear responsibility.
- Blade contains presentation logic, not hidden business rules.
- Commands report errors clearly.

## Output format

- Name the Laravel convention that fits the issue.
- Explain why a Service/Action is or is not justified.
- Separate framework convention fixes from taste.
- Suggest concrete verification commands.

## Bad signs

- Manual validation repeated in controllers.
- Permission checks copied across actions instead of Policy.
- Service classes that only call `Model::query()`.
- Fat Livewire `render()` methods.
- Blade templates with complex nested conditions.
- Jobs that both decide business rules and perform several side effects.

## Good signs

- `StorePostRequest` owns validation.
- `$this->authorize('update', $post)` or a clear Policy path.
- `User::active()->verified()` for repeated query concepts.
- Small Action for a real multi-step use case.
- Enums cast on Eloquent model status fields.

## Examples

### Bad

```php
public function store(Request $request)
{
    $data = $request->validate(['title' => ['required']]);

    Post::create($data);
}
```

### Better

```php
public function store(StorePostRequest $request)
{
    Post::create($request->validated());
}
```
