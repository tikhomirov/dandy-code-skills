---
name: exception-flow-review
description: Use to review PHP/Laravel exception handling, catch blocks, logging, messages, and expected versus unexpected errors.
---

# Exception Flow Review

## Purpose

Keep error flow visible, useful, and honest without swallowing failures or turning exceptions into routine branching.

## When to use

- Code catches `Throwable` or `Exception` broadly.
- Catch blocks are empty or only return `null`.
- Exceptions have vague messages.
- User-facing validation and system failures are mixed.
- Exceptions are used for normal control flow.

## When not to use

- When Laravel validation, authorization, or model-not-found behavior already handles the case well.
- When the user asks only for happy-path refactor.
- When changing exception types would affect external contracts without approval.

## Core rules

- Never catch and forget.
- Catch the narrowest meaningful exception.
- Log only where the error is handled or useful context is added.
- Use clear messages with relevant identifiers, not secrets.
- Separate expected user/domain errors from unexpected system failures.
- Do not use exceptions as a loop condition or ordinary branch.

## Workflow

1. Map where errors originate and where they are handled.
2. Classify each error as expected domain/user error or unexpected failure.
3. Replace broad catch with specific exceptions where possible.
4. Improve messages and context-safe logging.
5. Let Laravel report/render mechanisms handle unhandled failures when appropriate.
6. Add tests for expected exceptions.

## Review checklist

- No empty catch remains.
- Messages explain what failed.
- Logs include useful safe context.
- Expected errors are represented deliberately.
- Unexpected errors are not hidden from monitoring.

## Output format

- List swallowed errors and broad catches first.
- Recommend exception class, message, or logging changes.
- Mention user-facing behavior separately from developer diagnostics.
- Mark risky behavior changes clearly.

## Bad signs

- `catch (Exception $e) {}`.
- `catch (Throwable $e) { return null; }`.
- `throw new Exception('Error')`.
- Logging the same exception repeatedly at every layer.
- Using `try/catch` to check if a row exists.

## Good signs

- `CannotDeleteActiveUser` for a domain violation.
- `Log::warning()` with safe external provider context.
- `ValidationException` for user-correctable input.
- `ModelNotFoundException` allowed to become 404.

## Examples

### Bad

```php
try {
    $gateway->charge($order);
} catch (Exception $e) {
    return false;
}
```

### Better

```php
try {
    $gateway->charge($order);
} catch (PaymentGatewayUnavailable $e) {
    Log::warning('Payment gateway unavailable', ['order_id' => $order->id]);

    return false;
}
```
