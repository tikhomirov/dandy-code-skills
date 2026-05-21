---
name: testability-pass
description: Use to make PHP/Laravel code easier to test with Pest or PHPUnit through minimal behavior-preserving refactoring.
---

# Testability Pass

## Purpose

Expose business decisions to fast tests by separating pure logic from I/O and hidden dependencies.

## When to use

- Business logic is mixed with time, network, filesystem, database, or framework I/O.
- A method is too large to test directly.
- Complex conditions have no focused tests.
- The user wants safer refactoring before adding tests.

## When not to use

- When an integration or feature test is the correct level.
- When extracting dependencies would overcomplicate simple code.
- When there is no behavior to protect.

## Core rules

- The test is the first client of the code.
- Prefer small pure units for business rules.
- Keep Laravel feature tests for framework integration.
- Inject clocks, clients, and collaborators only when they make tests simpler.
- Do not mock the whole application to avoid a small design issue.
- Use Pest/PHPUnit conventions already present in the project.

## Workflow

1. Identify behavior worth protecting.
2. Separate calculation/decision from I/O boundary.
3. Move direct time, network, filesystem, or database access behind a small seam if needed.
4. Write focused Pest/PHPUnit tests for branchy logic.
5. Keep database tests realistic when Eloquent behavior matters.
6. Run the narrowest relevant tests.

## Review checklist

- Business rules can be tested without booting unnecessary infrastructure.
- I/O remains at boundaries.
- No fake abstraction was added only for mocking.
- Tests use Arrange-Act-Assert structure.
- Edge cases in conditions are covered.

## Output format

- Suggest the smallest seam and the first tests to write.
- Say whether unit, feature, or integration test is appropriate.
- Include likely commands: `vendor/bin/pest` or `vendor/bin/phpunit` when available.
- State what behavior must not change.

## Bad signs

- `now()`, `Http::`, `Storage::`, and DB writes inside one business method.
- `sleep()` in tests.
- One feature test covering many hidden rules.
- Mocking Eloquent when a real database test would be clearer.
- Private logic only reachable through a full HTTP request.

## Good signs

- A pure price calculator tested with Pest datasets.
- Feature test for controller wiring.
- Clock or client injected only at an external boundary.
- Factories for realistic Eloquent scenarios.

## Examples

### Bad

```php
public function expired(): bool
{
    return now()->greaterThan($this->expires_at);
}
```

### Better

```php
public function expired(CarbonInterface $now): bool
{
    return $now->greaterThan($this->expires_at);
}
```
