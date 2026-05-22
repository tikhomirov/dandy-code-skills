# Recipe: Arguments

## Problem

A call site is hard to understand because the signature carries too many loose values.

## Bad signs

- 5+ parameters.
- Boolean flags change behavior.
- `null, null, true` placeholders.
- `array $data` with undocumented keys.

## Before

```php
$mailer->send($user->email, 'Welcome', $body, true, null, 'high');
```

## After

```php
$mailer->sendWelcomeEmail($user, Priority::High);
```

## How to fix

1. Inspect call sites.
2. Group values that form one concept.
3. Replace flags with separate methods or enum.
4. Use DTO/value object/FormRequest when structure repeats or needs validation.
5. Avoid DTOs that add only ceremony.

## When not to apply

- A private helper has a clear small signature.
- Public signature change is risky.
- Laravel/framework signature is fixed.

## Related recipes

- `naming.md`
- `conditions.md`
- `tests.md`
