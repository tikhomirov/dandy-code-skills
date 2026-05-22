# Dandy Code Agent Skills v2

Small skills for PHP/Laravel AI agents that should write code for people, not only for the interpreter.

This package is inspired by the Russian book **“Денди-код”** / **“Практики, которые переведут код из «работает» в «вызывающий уважение»”**.

It does not retell the book. It turns its ideas into practical agent workflows: review a project, check a diff before commit, break down a difficult method, and apply Dandy Code style inside any coding task.

## What this is

A skill set for codex-style agents, Claude Code, OpenCode, Pi, and similar coding assistants.

The goal is to help agents:

- write code that is easier to read;
- keep Laravel code close to Laravel-way;
- remove noise before adding architecture;
- catch suspicious AI-generated code before commit;
- improve code in small, safe, verifiable steps.

This is not a clean-code religion. It is a practical tool for everyday code that must be maintained later.

## Why v2 is built this way

V1 exposed many topic skills: naming, comments, conditions, magic values, testability, and more.

That was tidy, but not convenient. Real requests usually sound like this:

- “review this module”;
- “check the diff before commit”;
- “break down this method”;
- “use Dandy Code style while planning the refactor”.

So v2 exposes four public entrypoints and moves topic rules into internal recipes. The user gets simple workflows. The agent gets a map and loads only what it needs.

## Public skills

### `dandy-style`

The core router and rule map.

Use it when Dandy Code is mentioned inside another task:

```text
Create a refactoring plan for OrderService. Use Dandy Code style.
```

The agent should keep the original task primary, read `recipe-map.md`, pick only relevant recipes, and avoid a full project audit.

### `dandy-review`

Review a project, module, file, or diff.

Use it when the user wants to find readability and maintainability problems: weak names, deep nesting, magic values, noisy comments, fat controllers, Laravel-way violations, or suspicious AI code.

`/dandy-start` is treated as an alias for `dandy-review` in onboarding mode.

### `dandy-commit`

Check changed code before commit.

Use it when there is a git diff. It reviews changed files and nearby context, suggests safe fixes, prepares a commit summary, and can run checks when appropriate.

It must not commit unless the user explicitly asks.

### `dandy-breakdown`

Analyze one selected method, class, file, or pasted snippet.

It explains what the code does, what makes it hard to read, which recipes apply, and what the smallest safe improvement looks like.

## Direct and contextual invocation

Each public skill has two modes.

### Direct invocation

The user explicitly calls a skill:

```text
/dandy-review
/dandy-commit
/dandy-breakdown
```

In this mode, the agent may inspect the requested scope, ask what hurts if the scope is unclear, and return a focused review or safe changes.

### Contextual invocation

The user mentions Dandy Code inside another task:

```text
Plan a refactor for the billing module using Dandy Code style.
```

In this mode, the original task stays primary. The agent must not start a broad audit or scan unrelated files.

## Lazy loading

Agents should not read every rule on every request.

Load in this order:

1. selected `SKILL.md`;
2. `dandy-style/recipe-map.md`;
3. only recipes that match the task or detected smell.

This gives three advantages:

- lower token usage;
- less chance of applying every rule at once;
- better focus on the user's actual task.

## Structure

```text
.agents/skills/
  dandy-style/
    SKILL.md
    recipe-map.md
    recipes/
      naming.md
      early-exit.md
      conditions.md
      magic-values.md
      comments.md
      arguments.md
      exceptions.md
      size.md
      no-nonsense.md
      tests.md
      laravel-way.md
      ai-generated-code.md
  dandy-review/
    SKILL.md
  dandy-commit/
    SKILL.md
  dandy-breakdown/
    SKILL.md
```

`.agents/skills` is the source of truth. `.claude/skills` and `.opencode/skills` contain compatibility wrappers for the four public entrypoints.

## Usage examples

```text
/dandy-review app/Services/OrderService.php
/dandy-commit review-only
/dandy-commit fix-safe
/dandy-breakdown app/Http/Controllers/CheckoutController.php
```

Contextual use:

```text
Create a refactoring plan for the payment module. Use Dandy Code style.
```

## Install

```bash
cp -R .agents/skills /path/to/project/.agents/
cp -R .claude/skills /path/to/project/.claude/
cp -R .opencode/skills /path/to/project/.opencode/
```

## Verification mindset

After code changes, prefer tools over taste:

- Laravel Pint / PSR-12 for formatting;
- Pest or PHPUnit for behavior;
- static analysis if the project already uses it.

Dandy Code is not about making code “pretty”. The goal is code that tells the truth, keeps the reader oriented, and stays safe to change.

---

# Dandy Code Agent Skills v2

Небольшие skills для PHP/Laravel AI-агентов, которые должны писать код для людей, а не только для интерпретатора.

Этот пакет вдохновлён книгой **«Денди-код»** / **«Практики, которые переведут код из “работает” в “вызывающий уважение”»**.

Это не пересказ книги. Здесь идеи книги превращены в практические сценарии для агента: провести ревью проекта, проверить diff перед коммитом, разобрать сложный метод и применить Денди-код стиль внутри любой задачи по коду.

## Что это такое

Набор skills для codex-style агентов, Claude Code, OpenCode, Pi и похожих помощников для разработки.

Цель — помочь агентам:

- писать код, который проще читать;
- держать Laravel-код ближе к Laravel-way;
- убирать шум до добавления архитектуры;
- ловить подозрительный AI-код до коммита;
- улучшать код маленькими, безопасными и проверяемыми шагами.

Это не религия чистого кода. Это практический инструмент для обычного кода, который потом кому-то поддерживать.

## Почему v2 сделана именно так

В первой версии наружу были вынесены тематические skills: naming, comments, conditions, magic values, testability и другие.

Выглядело аккуратно, но пользоваться было неудобно. Реальные запросы обычно звучат так:

- «проверь этот модуль»;
- «посмотри diff перед коммитом»;
- «разбери этот метод»;
- «используй Денди-код при планировании рефакторинга».

Поэтому во второй версии наружу вынесены четыре публичные точки входа, а тематические правила убраны внутрь как рецепты. Пользователь получает простые сценарии. Агент получает карту и загружает только то, что нужно.

## Публичные skills

### `dandy-style`

Главное ядро и карта правил.

Используется, когда Денди-код упоминается внутри другой задачи:

```text
Составь план рефакторинга OrderService. Используй Денди-код стиль.
```

Агент должен оставить исходную задачу главной, прочитать `recipe-map.md`, выбрать только нужные рецепты и не запускать полный аудит проекта.

### `dandy-review`

Ревью проекта, модуля, файла или diff.

Используется, когда нужно найти проблемы читаемости и поддержки: слабые имена, глубокую вложенность, магические значения, шумные комментарии, толстые контроллеры, нарушения Laravel-way или подозрительный AI-код.

`/dandy-start` считается alias для `dandy-review` в onboarding-режиме.

### `dandy-commit`

Проверка изменённого кода перед коммитом.

Используется, когда есть git diff. Проверяет изменённые файлы и ближайший контекст, предлагает безопасные правки, готовит summary для коммита и при необходимости запускает проверки.

Коммитить без прямой команды пользователя нельзя.

### `dandy-breakdown`

Разбор одного выбранного метода, класса, файла или вставленного фрагмента.

Объясняет, что делает код, почему его тяжело читать, какие рецепты подходят и как выглядит минимальное безопасное улучшение.

## Прямой и контекстный вызов

У каждого публичного skill есть два режима.

### Прямой вызов

Пользователь явно запускает skill:

```text
/dandy-review
/dandy-commit
/dandy-breakdown
```

В этом режиме агент может изучить указанную область, уточнить, где болит, если область не ясна, и вернуть ревью или безопасные правки.

### Контекстный вызов

Пользователь упоминает Денди-код внутри другой задачи:

```text
Составь план рефакторинга billing-модуля в Денди-код стиле.
```

В этом режиме исходная задача остаётся главной. Агент не должен запускать широкий аудит или сканировать нерелевантные файлы.

## Ленивая загрузка

Агент не должен читать все правила при каждом запросе.

Порядок загрузки:

1. выбранный `SKILL.md`;
2. `dandy-style/recipe-map.md`;
3. только рецепты, которые подходят к задаче или найденному запаху кода.

Это даёт три плюса:

- меньше расход токенов;
- меньше шанс применить все правила сразу;
- больше фокуса на реальной задаче пользователя.

## Структура

```text
.agents/skills/
  dandy-style/
    SKILL.md
    recipe-map.md
    recipes/
      naming.md
      early-exit.md
      conditions.md
      magic-values.md
      comments.md
      arguments.md
      exceptions.md
      size.md
      no-nonsense.md
      tests.md
      laravel-way.md
      ai-generated-code.md
  dandy-review/
    SKILL.md
  dandy-commit/
    SKILL.md
  dandy-breakdown/
    SKILL.md
```

`.agents/skills` — источник правды. В `.claude/skills` и `.opencode/skills` лежат совместимые wrapper-файлы для четырёх публичных entrypoints.

## Примеры использования

```text
/dandy-review app/Services/OrderService.php
/dandy-commit review-only
/dandy-commit fix-safe
/dandy-breakdown app/Http/Controllers/CheckoutController.php
```

Контекстное использование:

```text
Составь план рефакторинга модуля оплат. Используй Денди-код стиль.
```

## Установка

```bash
cp -R .agents/skills /path/to/project/.agents/
cp -R .claude/skills /path/to/project/.claude/
cp -R .opencode/skills /path/to/project/.opencode/
```

## Подход к проверке

После изменений в коде лучше спорить не вкусами, а инструментами:

- Laravel Pint / PSR-12 для форматирования;
- Pest или PHPUnit для поведения;
- статический анализ, если он уже используется в проекте.

Денди-код — не про “красивенько”. Цель — код, который говорит правду, держит читателя в контексте и остаётся безопасным для изменений.
