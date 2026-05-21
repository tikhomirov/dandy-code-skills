---
name: magic-value-extractor
description: Use to find and replace magic strings, numbers, statuses, roles, limits, timeouts, currencies, and repeated literals in PHP/Laravel code.
---

# Magic Value Extractor

## Purpose

Make hidden domain concepts explicit without creating constants for every literal.

## When to use

- A literal value controls behavior.
- Statuses, roles, types, currency codes, or limits repeat.
- A number or string requires explanation to understand.
- Configurable values are hard-coded.

## When not to use

- For harmless obvious values like `0`, `1`, empty string, or one-off formatting literals.
- When a constant name would merely repeat the value.
- When extraction would create global coupling.

## Core rules

- Extract meaning, not just text.
- Prefer enums for finite domain states and types.
- Prefer config for deploy-time or environment values.
- Prefer class constants for local invariant values.
- Prefer value objects for concepts with behavior or validation.
- Do not create constants just to satisfy a rule.

## Workflow

1. Find repeated or behavior-changing literals.
2. Ask what domain concept the value represents.
3. Choose enum, config, constant, method, or value object based on scope.
4. Replace usages locally first.
5. Add tests for changed status, type, or limit behavior.

## Review checklist

- The extracted name reveals why the value exists.
- The scope is no wider than necessary.
- No constant was created only to avoid a literal.
- Laravel config and env boundaries are respected.
- Enums are used where they improve safety.

## Output format

- List magic value → suggested concept → extraction target.
- Separate required fixes from optional cleanup.
- Mention migration or database impact if enum/status storage changes.

## Bad signs

- `status === 1` in several places.
- `role === 'a'`.
- Timeout `30` repeated in clients and jobs.
- Currency `'RUB'` scattered across checkout code.
- Constants like `const ONE = 1`.

## Good signs

- `OrderStatus::Paid`.
- `config('services.sms.timeout')`.
- `private const MAX_EXPORT_ROWS = 10_000`.
- `Money::rub($amount)`.

## Examples

### Bad

```php
if ($order->status === 'p') {
    $this->ship($order);
}
```

### Better

```php
if ($order->status === OrderStatus::Paid) {
    $this->ship($order);
}
```
