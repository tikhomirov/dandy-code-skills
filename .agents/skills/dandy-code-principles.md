# Dandy Code Principles for Agents

- Code is communication between people first and instructions for the machine second.
- The reader matters more than the author: optimize for the next person opening the file.
- One consistent project style beats personal taste.
- A name must tell the truth about role, behavior, unit, and side effects.
- Good code lowers cognitive load instead of showing cleverness.
- Nesting makes reading harder; keep the main scenario visible.
- A useful comment explains why, not what the next line already says.
- Magic values hide meaning; extract real domain concepts, not constants for their own sake.
- AI continues the style of the input code, so inspect the project before generating changes.
- A good refactor is small, verifiable, and safe.
- Do not change business logic without explicit approval.
- Do not add abstraction unless it removes real complexity today.
- Separate bugs, risks, readability issues, and taste.
- If a formatter can solve it, use Pint or PSR-12 instead of debating whitespace.
