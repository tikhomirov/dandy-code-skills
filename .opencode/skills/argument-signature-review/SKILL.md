---
name: argument-signature-review
description: Use to review PHP/Laravel function and method signatures for too many arguments, boolean flags, nullable clutter, and unstructured arrays.
---

# Argument Signature Review

## Purpose

Make method calls understandable at the call site and reduce parameter-driven branching.

## When to use

- A method has more than three arguments.
- Boolean flags change what the method does.
- Several nullable arguments are skipped with `null`.
- Arrays carry structured data without a contract.
- The same arguments travel together.

## When not to use

- When a small private helper has clear, stable arguments.
- When changing a public signature would be riskier than the readability gain.
- When Laravel framework signatures are fixed.

## Core rules

- Prefer fewer explicit arguments.
- Move optional arguments to the end.
- Replace boolean flags with separate methods or enums when behavior changes.
- Use DTOs, value objects, FormRequest, or command objects for grouped data.
- Do not wrap everything in DTOs by default.
- Keep call sites readable.

## Workflow

1. Inspect the signature and several call sites.
2. Identify groups that form one concept.
3. Find flags that split responsibilities.
4. Choose the smallest safer change: reorder, split method, DTO, enum, named constructor, or request object.
5. Update tests and callers carefully.

## Review checklist

- Call sites read without inline comments.
- Arguments match one responsibility.
- No `null` placeholders are required for common calls.
- Flags do not hide multiple behaviors.
- New DTO/value object is justified by repeated structure or validation.

## Output format

- Show problematic signature and safer alternatives.
- Label breaking API changes clearly.
- Recommend incremental migration if callers are many.
- Separate real risks from readability preferences.

## Bad signs

- `send($to, $subject, $body, true, null, 'high')`.
- `create(array $data)` with undocumented keys.
- `update($user, true)` where `true` means notify.
- Methods accepting five nullable scalars.

## Good signs

- `sendUrgent($message)`.
- `CreateUserData` DTO for repeated validated fields.
- `NotificationPriority::High`.
- `StoreUserRequest` handles HTTP validation before service call.

## Examples

### Bad

```php
$mailer->send($user->email, 'Welcome', $body, true);
```

### Better

```php
$mailer->sendWelcomeEmail($user, Priority::High);
```
