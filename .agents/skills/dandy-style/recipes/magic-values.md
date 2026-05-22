# Recipe: Magic Values

## Problem

A literal value controls behavior but its meaning is hidden.

## Bad signs

- `status === 1`, `role === 'a'`, `type === 'x'`.
- Repeated timeout, limit, currency, provider code, or state.
- A value needs a comment to explain it.

## Before

```php
if ($order->status === 'p') {
    $this->ship($order);
}
```

## After

```php
if ($order->status === OrderStatus::Paid) {
    $this->ship($order);
}
```

## How to fix

1. Ask what domain concept the value represents.
2. Use enum for finite states, config for deploy-time settings, class constant for local invariant, value object for behavior/validation.
3. Replace locally first.
4. Add tests for changed state/limit behavior.

## When not to apply

- The literal is obvious and harmless.
- A constant would merely repeat the value.
- A framework helper already expresses the concept.

## Related recipes

- `naming.md`
- `conditions.md`
- `laravel-way.md`
