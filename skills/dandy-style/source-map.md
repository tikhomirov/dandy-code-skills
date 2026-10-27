# Dandy Code Source Map

This package must stay close to the book. Do not invent a generic clean-code framework when a chapter gives a concrete recipe.

Use this map to connect agent behavior to the original chapter topics.

| Book chapter | Agent recipe |
|---|---|
| `content/001-preface.md` — practical, visual readability first | `recipes/philosophy.md` |
| `content/002-readme.md` — project starts with README | `recipes/readme.md` |
| `content/003-big.md` — large monoliths need visible boundaries | `recipes/component-boundaries.md` |
| `content/004-communication.md` — code is communication | `recipes/communication.md` |
| `content/005-code-style.md` — consistent code style | `recipes/code-style.md` |
| `content/006-code-breath.md` — visual breathing and grouping | `recipes/code-breath.md` |
| `content/007-naming.md` — truthful names | `recipes/naming.md` |
| `content/008-magic-value.md` — magic values and meaningful concepts | `recipes/magic-values.md` |
| `content/009-size.md` — size of methods/classes | `recipes/size.md` |
| `content/010-no-nonsense.md` — no useless noise | `recipes/no-nonsense.md` |
| `content/011-early-exit.md` — early exit and less nesting | `recipes/early-exit.md` |
| `content/012-conditions.md` — readable conditions | `recipes/conditions.md` |
| `content/013-arguments.md` — method arguments | `recipes/arguments.md` |
| `content/014-exceptions.md` — exceptions and error flow | `recipes/exceptions.md` |
| `content/015-comments.md` — useful comments | `recipes/comments.md` |
| `content/016-remove.md` — remove unnecessary code | `recipes/remove.md` |
| `content/017-tests.md` — tests and confidence | `recipes/tests.md` |
| `content/018-frameworks.md` — play by framework rules | `recipes/frameworks.md` |
| `content/019-upgrade.md` — do not refuse the future | `recipes/upgrades.md` |
| `content/020-copilot.md` — AI assistants continue existing style | `recipes/ai-generated-code.md` |
| `content/099-after.md` — understandable beats clever | `recipes/practice-loop.md` |

## Rule for agents

For broad Dandy Code workflows, follow the book order:

1. set the expectation: practical visual readability, not architecture religion;
2. check project entry: README, setup, tests, structure, owners;
3. check scale and boundaries;
4. check communication: whether code reads naturally to humans;
5. check visible style: formatting and breathing;
6. check local readability: names, magic values, size, early exit, conditions, arguments;
7. check correctness support: exceptions and tests;
8. check cleanup: comments, removal, AI drift;
9. check ecosystem discipline: framework conventions and upgrades.

If a recommendation is not connected to a chapter-derived recipe, label it as an extra recommendation, not Dandy Code.
