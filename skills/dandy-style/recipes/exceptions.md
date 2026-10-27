# Recipe: Exceptions

## Problem

Error flow is hidden, too broad, or misleading.

## Bad signs

- Empty catch.
- `catch (Throwable $e) { return null; }`.
- `throw new Exception('Error')`.
- Exceptions used for ordinary branching.

## Before

```php
try {
    $gateway->charge($order);
} catch (Exception $e) {
    return false;
}
```

## After

```php
try {
    $gateway->charge($order);
} catch (PaymentGatewayUnavailable $e) {
    Log::warning('Payment gateway unavailable', ['order_id' => $order->id]);

    return false;
}
```

## How to fix

1. Classify expected vs unexpected error.
2. Catch the narrowest useful exception.
3. Do not swallow errors without handling/reporting.
4. Improve messages with safe useful context.
5. Let Laravel render/report common exceptions where appropriate.

## When not to apply

- Existing Laravel validation/authorization/not-found behavior is enough.
- Exception type is an external contract.
- The task is only happy-path readability.

## Related recipes

- `early-exit.md`
- `tests.md`
- `laravel-way.md`
