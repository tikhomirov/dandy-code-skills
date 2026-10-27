# Recipe: Code Style

## Source

Based on `content/005-code-style.md`: consistent style is not a taste fight. It removes needless friction.

## Problem

The project mixes formatting styles, making code look like it was written by unrelated teams or random evenings.

## Bad signs

- Same constructs formatted differently across files.
- No formatter or formatter not documented.
- Review comments argue about spaces and braces instead of behavior.
- Laravel project does not mention Pint/PSR-12 or an equivalent standard.

## How to fix

1. Find the existing style tool: Pint, PHP CS Fixer, PHPCS, editorconfig.
2. If missing, recommend one standard rather than personal preferences.
3. Document the command in README.
4. Run the formatter separately from behavior changes when possible.
5. Do not mix massive formatting with feature logic in one commit.

## Before

```php
if($user){return true;}
```

## After

```php
if ($user) {
    return true;
}
```

## When not to apply

- The user asked for behavior review only and formatting is unrelated.
- The project intentionally follows a different consistent standard.

## Related recipes

- `readme.md`
- `code-breath.md`
- `dandy-commit` workflow
