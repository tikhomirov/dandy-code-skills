# Recipe: Component Boundaries

## Source

Based on `content/003-big.md`: big monoliths are normal, but a huge shapeless repository creates anxiety. Break large work into visible, understandable parts. Extract reusable components when they are real boundaries.

## Problem

A project or module is too large to understand, and developers do not know where to start or where new code belongs.

## Bad signs

- Huge monolith with no visible modules or entry points.
- Reusable domain concepts trapped inside unrelated application code.
- Repeated utility/domain code copied across modules.
- New developers cannot find the safe place to make a change.

## Good signs

- Bounded modules are visible.
- Small reusable components have tests and documentation.
- Composer/package boundaries are used when a component is genuinely reusable.
- The main app becomes easier to understand, not just more fragmented.

## How to fix

1. Do not jump to microservices.
2. Find small reusable components or isolated domain concepts.
3. Add tests and README before extraction.
4. Extract only when it reduces cognitive load.
5. Keep boundaries understandable for future contributors.

## When not to apply

- The code is large but coherent and local.
- Extraction would create a package with one project-specific use.
- Tests/documentation are missing and extraction would be unsafe.

## Related recipes

- `readme.md`
- `size.md`
- `tests.md`
- `frameworks.md`
