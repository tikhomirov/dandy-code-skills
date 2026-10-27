# Recipe: Size and Shape

## Problem

A method/class/file is large enough that the reader cannot hold its purpose in mind.

## Bad signs

- Several reasons to change.
- Mixed abstraction levels.
- Controller validates, authorizes, queries, calculates, notifies, renders.
- Many navigation comments.

## Before

```php
public function store(Request $request)
{
    // validate
    // authorize
    // calculate
    // save
    // notify
    // render
}
```

## After

```php
public function store(StoreOrderRequest $request, CreateOrder $createOrder)
{
    $order = $createOrder->handle($request->user(), $request->validated());

    return redirect()->route('orders.show', $order);
}
```

## How to fix

1. Identify the primary responsibility.
2. Mark mixed concerns.
3. Extract only named concepts that reduce complexity now.
4. Keep extractions small and testable.
5. Prefer framework conventions before custom layers.

## When not to apply

- Long but linear code is easier in one place.
- Extraction creates architecture theater.
- Behavior lacks tests for safe refactor.

## Related recipes

- `laravel-way.md`
- `tests.md`
- `early-exit.md`
- `no-nonsense.md`
