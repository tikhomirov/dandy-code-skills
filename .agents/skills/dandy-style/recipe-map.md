# Dandy Code Recipe Map

Use this file before loading any recipe.

For broad direct review, read `source-map.md` first. For contextual use, load only matching recipes.

| Smell or task | Load recipe |
|---|---|
| User asks what Dandy Code means or scope is drifting into architecture theory | `recipes/philosophy.md` |
| Missing, empty, unclear, or outdated project README | `recipes/readme.md` |
| Huge monolith, no visible module boundaries, reusable concept trapped inside app | `recipes/component-boundaries.md` |
| Code does not read like communication, mixed voices/styles | `recipes/communication.md` |
| Formatting disputes, inconsistent style, no formatter | `recipes/code-style.md` |
| Dense blocks, no visual grouping, code has no breathing room | `recipes/code-breath.md` |
| `$data`, `$result`, `$item`, vague names, translit | `recipes/naming.md` |
| Deep nested `if/else`, hidden happy path, useless `else` | `recipes/early-exit.md` |
| Long boolean expression, double negative, nested ternary | `recipes/conditions.md` |
| `status == 1`, magic strings, hidden roles/types/limits | `recipes/magic-values.md` |
| Comment repeats code, stale TODO/FIXME/HACK, AI narration | `recipes/comments.md` |
| 5+ args, boolean flags, nullable clutter, arrays as contracts | `recipes/arguments.md` |
| Empty catch, generic Exception, swallowed errors | `recipes/exceptions.md` |
| Large method/class, mixed abstraction levels | `recipes/size.md` |
| Ceremony, wrappers, future-proofing | `recipes/no-nonsense.md` |
| Dead code, old backups, commented blocks, unused files | `recipes/remove.md` |
| Hard-to-test code, hidden dependencies, mixed IO and logic | `recipes/tests.md` |
| Fighting Laravel/framework conventions, custom layers over built-in features | `recipes/frameworks.md` and `recipes/laravel-way.md` |
| Old framework/package/PHP versions, upgrade debt, “works, don't touch” | `recipes/upgrades.md` |
| AI-generated code, duplicated patterns, speculative abstractions | `recipes/ai-generated-code.md` |
| Need habit loop / daily improvement plan | `recipes/practice-loop.md` |

## Loading limits

- Contextual mode: at most 1-3 recipes.
- Review mode: load `source-map.md`, then recipes after detecting smells.
- Commit mode: inspect changed files first.
- Breakdown mode: load recipes for selected code only.
- Never load examples unless editing or explaining concrete code.
