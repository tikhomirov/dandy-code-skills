# Recipe: Code as Communication

## Source

Based on `content/004-communication.md`: code is read by people again and again. The machine does not care about style; future readers do.

## Problem

The code works but reads like several people speaking different languages at once.

## Bad signs

- Mixed naming languages or tone.
- Different styles in neighboring files.
- Clever code that hides intent.
- Comments, names, and structure do not tell the same story.
- The reader must reconstruct context from scattered clues.

## Good signs

- The code has one clear voice.
- Names, structure, comments, and formatting help the same story.
- A new developer can understand the intent without asking the author.

## How to fix

1. Identify the reader: future maintainer, teammate, or new contributor.
2. Remove mixed vocabulary and private jokes.
3. Align naming and style with surrounding code.
4. Prefer plain domain language over cleverness.
5. Use other recipes for concrete fixes: naming, comments, code breath, size.

## When not to apply

- Machine-generated code is not meant to be edited by humans.
- The user asked for a low-level performance hotspot and readability changes need measurement.

## Related recipes

- `naming.md`
- `comments.md`
- `code-breath.md`
- `code-style.md`
