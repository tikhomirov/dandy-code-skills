# Recipe: Testability

## Problem

Code is hard to verify because decisions are mixed with IO, hidden dependencies, time, network, or framework glue.

## Bad signs

- Business rules in controllers/jobs/Blade/Livewire render.
- Direct calls to time/filesystem/HTTP/providers.
- Tests only assert mocks.
- Small calculation needs full app boot.

## Before

```php
public function discount(): int
{
    return now()->isWeekend() ? 10 : 0;
}
```

## After

```php
public function discount(CarbonInterface $date): int
{
    return $date->isWeekend() ? 10 : 0;
}
```

## How to fix

1. Separate pure decision logic from IO.
2. Inject time/provider boundaries when behavior depends on them.
3. Extract testable domain decisions before large rewrites.
4. Add tests around risky branches.
5. Prefer behavior tests over mock-count tests.

## When not to apply

- Framework integration is the behavior.
- Extraction adds more complexity than it removes.
- The task is non-behavioral formatting cleanup.

## Related recipes

- `size.md`
- `conditions.md`
- `arguments.md`
- `ai-generated-code.md`
