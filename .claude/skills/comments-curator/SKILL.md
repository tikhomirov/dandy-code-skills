---
name: comments-curator
description: Use to remove noisy comments and keep only comments that explain why PHP/Laravel code exists or behaves unusually.
---

# Comments Curator

## Purpose

Make comments earn their place by explaining context that code cannot express well.

## When to use

- Comments repeat code.
- `TODO`, `FIXME`, or `HACK` markers are vague or stale.
- A comment can be replaced by a better name or small refactor.
- A non-obvious workaround needs clearer context.

## When not to use

- When public API documentation is required by project standards.
- When removing a comment would lose external context.
- When the issue is code structure, not commentary.

## Core rules

- Good comments explain why, not what.
- Prefer better names and structure over explanatory comments.
- Update comments with code changes.
- Turn vague TODOs into specific owner/action/condition when possible.
- Do not add confident comments for assumptions you did not verify.
- Keep comments short and close to the surprising code.

## Workflow

1. Read comment and code independently.
2. Delete comments that merely narrate the next line.
3. Rename or extract when code can explain itself.
4. Keep or rewrite comments that preserve business, legal, performance, or historical context.
5. Check `TODO`, `FIXME`, and `HACK` for actionability.

## Review checklist

- Remaining comments answer why this exists.
- No stale or contradictory comments remain.
- TODOs are concrete enough to act on.
- Names carry obvious meaning without comments.
- No multi-paragraph comments unless project explicitly requires them.

## Output format

- Report removed, rewritten, and kept comments separately.
- Explain why kept comments matter.
- Suggest issue/task wording for vague TODOs.
- Separate critical stale comments from optional cleanup.

## Bad signs

- `// increment counter` above `$count++`.
- `// create user` above `User::create()`.
- `// TODO fix later`.
- Comment says cache is one hour while code caches ten minutes.
- AI-written comments describing every line.

## Good signs

- A one-line note explaining a provider bug workaround.
- A TODO with a concrete next step.
- A renamed variable that removes the need for a comment.
- Short comments that explain non-obvious constraints.

## Examples

### Bad

```php
// Check if user is admin
if ($user->isAdmin()) {
    // ...
}
```

### Better

```php
if ($user->isAdmin()) {
    // ...
}
```

### Good comment

```php
// Provider rejects retries faster than 60 seconds.
RetryJob::dispatch($payload)->delay(now()->addMinute());
```
