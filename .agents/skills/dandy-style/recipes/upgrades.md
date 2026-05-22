# Recipe: Upgrades

## Source

Based on `content/019-upgrade.md`: “works, don't touch” is not a strategy. Frameworks, PHP versions, packages, and standards move forward.

## Problem

The project avoids upgrades until technical debt becomes expensive and demotivating.

## Bad signs

- Old unsupported PHP/framework/package versions.
- Custom workarounds for features now provided by the framework.
- Big version gaps.
- Upgrade work is always postponed.
- New developers dislike the outdated stack.

## Good signs

- Versions are known and documented.
- Upgrade path exists.
- Deprecations are handled gradually.
- Temporary workarounds are removed when the platform provides a standard feature.

## How to fix

1. Identify current PHP, framework, and major package versions.
2. Check support status and upgrade gaps.
3. List custom workarounds that newer versions replace.
4. Plan small upgrade steps.
5. Keep upgrade changes separate from feature work when possible.

## When not to apply

- Production constraints require a freeze; document the reason and review date.
- The user asks only for local readability and upgrade risk is unrelated.

## Related recipes

- `frameworks.md`
- `remove.md`
- `tests.md`
