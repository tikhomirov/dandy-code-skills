# Recipe: Framework Rules

## Source

Based on `content/018-frameworks.md`: when you choose a framework, you accept its style and conventions. Fighting it creates architectural noise.

## Problem

The project uses a framework but constantly works against it.

## Bad signs

- Custom repositories wrap simple Eloquent calls without real reason.
- Laravel/Symfony/Yii pieces are mixed without a coherent architecture.
- Built-in validation, authorization, queues, commands, events, or ORM features are bypassed.
- The team wants framework benefits but refuses framework conventions.

## Good signs

- Framework conventions solve common problems.
- Custom abstractions appear only at real boundaries.
- The team either accepts the framework or honestly chooses another path.

## How to fix

1. Identify the framework contract: what does it already provide?
2. Remove wrappers that only duplicate framework features.
3. Prefer built-in conventions for common work.
4. Keep custom architecture for real domain or infrastructure boundaries.
5. If the team dislikes the framework, do not twist it into something else; discuss the tool choice.

## When not to apply

- Project intentionally follows a documented architecture that differs from the framework.
- Code is a framework-agnostic library.
- The wrapper hides a real external system or unstable dependency.

## Related recipes

- `laravel-way.md`
- `no-nonsense.md`
- `component-boundaries.md`
