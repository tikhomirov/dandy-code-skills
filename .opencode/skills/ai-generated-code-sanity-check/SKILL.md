---
name: ai-generated-code-sanity-check
description: Use to review AI-written PHP/Laravel code for project fit, duplicate patterns, overconfidence, unused code, and subtle domain mistakes.
---

# AI Generated Code Sanity Check

## Purpose

Prevent plausible AI output from drifting away from the project style or silently breaking domain behavior.

## When to use

- Code was produced or heavily modified by an AI agent.
- A patch introduces new patterns, services, helpers, interfaces, or abstractions.
- The code looks correct in isolation but may ignore local conventions.
- Reviewing generated tests or comments.

## When not to use

- When the change is a tiny mechanical edit already verified.
- When the user explicitly asks for a narrow syntax fix only.
- When no project context can be inspected.

## Core rules

- Before changing code, inspect neighboring code and existing patterns.
- Prefer existing services, models, policies, requests, jobs, and conventions.
- Delete unused generated code instead of leaving placeholders.
- Treat confident comments as suspicious unless verified.
- Do not invent architecture to look professional.
- Check domain behavior against current tests and call sites.

## Workflow

1. Read the files adjacent to the changed code.
2. Search for existing classes that already solve the problem.
3. Compare naming, exception style, validation, tests, and Laravel conventions.
4. Remove duplicated helpers and speculative abstractions.
5. Verify generated tests assert real behavior, not implementation guesses.
6. Run formatters and relevant tests.

## Review checklist

- No duplicate implementation of an existing concept.
- New code matches local style.
- No unused classes, methods, imports, or config remain.
- Comments do not overstate unverified facts.
- Tests would fail for the intended domain regression.

## Output format

- Report project-fit issues before cosmetic issues.
- Point to existing patterns the AI should have followed.
- Recommend deletion for unused scaffolding.
- Separate domain risks from style drift.

## Bad signs

- New Repository layer over Eloquent when project uses scopes.
- Helper class duplicating an existing Action.
- Tests that only assert mocks were called.
- Unused interface for a single class.
- Comments claiming security or performance without evidence.

## Good signs

- Patch follows nearby controller/request/resource style.
- Existing policy or FormRequest is reused.
- Generated code is minimal and covered by meaningful tests.
- No speculative extension points.

## Examples

### Bad

```php
class UserRepository
{
    public function find(int $id): ?User
    {
        return User::find($id);
    }
}
```

### Better

```php
$user = User::query()->findOrFail($id);
```

Prefer the existing Laravel/Eloquent style unless the project already uses repositories for real reasons.
