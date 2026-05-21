---
name: naming-cleanup
description: Use to improve misleading or vague names in PHP/Laravel variables, methods, classes, files, and directories.
---

# Naming Cleanup

## Purpose

Replace mental placeholders with names that tell the truth about domain role and behavior.

## When to use

- Code contains `$data`, `$result`, `$item`, `$tmp`, or `$arr` outside tiny obvious scopes.
- Classes use `Manager`, `Helper`, `Handler`, or `Service` without clarifying responsibility.
- Boolean names do not read like yes/no questions.
- Names hide units, side effects, or domain meaning.
- Translit or private abbreviations make code harder to read.

## When not to use

- When a short local variable is obvious in a tiny scope.
- When renaming public API would break callers and the user did not approve it.
- When the problem is formatting, not naming.

## Core rules

- Understand what the value represents before renaming.
- Prefer domain terms already used in the project.
- Boolean names should usually start with `is`, `has`, `can`, `should`, `allows`, or `requires`.
- Avoid transliteration and abbreviations known only to the author.
- Do not rename for novelty; rename to reduce doubt.
- Use IDE/refactoring tools for symbols when possible.

## Workflow

1. Read surrounding code and related models, requests, resources, and tests.
2. List vague or dishonest identifiers.
3. Infer role, unit, lifetime, and side effects.
4. Propose replacements with minimal scope.
5. Check references and tests after renaming.

## Review checklist

- New name explains role, not type only.
- Name does not promise behavior the code does not perform.
- Boolean reads naturally in conditions.
- Laravel naming conventions are respected.
- No broad churn from unnecessary renames.

## Output format

- Show `oldName` → `newName` and one reason.
- Flag risky public renames separately.
- If unsure, ask for domain vocabulary instead of guessing.

## Bad signs

- `$data`, `$result`, `$item`, `$tmp`, `$arr` outside tiny scopes.
- `UserManager` that only sends invitations.
- `$active` instead of `$isActive`.
- `getUser()` that creates a user.
- `polzovatel`, `zakaz`, or other translit in PHP names.

## Good signs

- `$validatedOrderData`, `$paidInvoices`, `$requiresApproval`.
- `InviteUser` action instead of vague `UserManager`.
- `archive()` does not delete.
- Units appear in names: `$timeoutSeconds`, `$priceCents`.

## Examples

### Bad

```php
$data = $request->validated();
$result = $service->handle($data);

if ($result) {
    // ...
}
```

### Better

```php
$validatedOrderData = $request->validated();
$orderWasCreated = $orders->createFromCheckout($validatedOrderData);

if ($orderWasCreated) {
    // ...
}
```
