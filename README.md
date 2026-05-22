# Dandy Code Agent Skills

Skills for AI coding agents, inspired by **“Денди-код”**.

The goal is simple: help an agent write and review PHP/Laravel code in a cleaner, more readable, more human style.

Not a generic clean-code manifesto. The skills are mapped to the book chapters: README, code style, code breathing, naming, magic values, method size, early return, conditions, arguments, exceptions, comments, removal, tests, framework rules, upgrades, and AI-generated code.

## Quick start

### Install from GitHub with npx

```bash
cd /path/to/your-project
npx github:tikhomirov/dandy-code-skills install
```

This copies skills into:

```text
.agents/skills
.claude/skills
.opencode/skills
```

### Install only one target

```bash
npx github:tikhomirov/dandy-code-skills install --target agents
npx github:tikhomirov/dandy-code-skills install --target claude
npx github:tikhomirov/dandy-code-skills install --target opencode
```

### Install manually

```bash
git clone https://github.com/tikhomirov/dandy-code-skills.git /tmp/dandy-code-skills
cd /path/to/your-project
cp -R /tmp/dandy-code-skills/.agents/skills .agents/
cp -R /tmp/dandy-code-skills/.claude/skills .claude/
cp -R /tmp/dandy-code-skills/.opencode/skills .opencode/
```

## Skills

### `dandy-style`

The main router. Use it when Dandy Code is a constraint inside another task.

```text
Refactor the payment module. Use Dandy Code style.
```

The agent should keep the original task primary, read the recipe map, and load only the rules that fit the task.

### `dandy-review`

Review a project, module, file, or diff.

```text
/dandy-review app/Services/OrderService.php
/dandy-review onboarding
```

`/dandy-start` is an alias for onboarding review: README, setup, test data, tests, structure, owners.

### `dandy-commit`

Check changed code before commit.

```text
/dandy-commit review-only
/dandy-commit fix-safe
```

It reviews the diff, checks project style, catches suspicious AI-generated code, and suggests safe fixes. It must not commit without explicit approval.

### `dandy-breakdown`

Analyze one method, class, file, or pasted snippet.

```text
/dandy-breakdown app/Http/Controllers/CheckoutController.php
```

It explains what the code does, what hurts readability, which recipes apply, and what the smallest safe improvement looks like.

## How it works

The agent loads skills lazily:

1. selected `SKILL.md`;
2. `dandy-style/source-map.md` for broad review;
3. `dandy-style/recipe-map.md`;
4. only the recipes that match the task.

This keeps token usage lower and prevents the agent from applying every rule to every request.

## Package layout

```text
.agents/skills/          # source of truth
.claude/skills/          # Claude Code wrappers
.opencode/skills/        # OpenCode wrappers
bin/dandy-code-skills.mjs
package.json
```

## Good prompts

```text
Review this project in dandy style.
Refactor the payment module using Dandy Code rules.
Check the diff before commit, like a dandy.
Break down this method and suggest the smallest safe cleanup.
```

## Verification

After code changes, prefer tools over taste:

- Laravel Pint / PSR-12 for formatting;
- Pest or PHPUnit for behavior;
- static analysis if the project already uses it.

---

# Dandy Code Agent Skills

Skills для AI-агентов, вдохновлённые книгой **«Денди-код»**.

Цель простая: помочь агенту писать и проверять PHP/Laravel-код аккуратнее, понятнее и человечнее.

Это не абстрактный clean-code-манифест. Skills привязаны к главам книги: README, стиль кода, «дыхание» кода, имена, магические значения, размер методов, ранний выход, условия, аргументы, исключения, комментарии, удаление лишнего, тесты, правила фреймворка, обновления и AI-код.

## Быстрый старт

### Установка через npx из GitHub

```bash
cd /path/to/your-project
npx github:tikhomirov/dandy-code-skills install
```

Команда скопирует skills в:

```text
.agents/skills
.claude/skills
.opencode/skills
```

### Установить только один вариант

```bash
npx github:tikhomirov/dandy-code-skills install --target agents
npx github:tikhomirov/dandy-code-skills install --target claude
npx github:tikhomirov/dandy-code-skills install --target opencode
```

### Ручная установка

```bash
git clone https://github.com/tikhomirov/dandy-code-skills.git /tmp/dandy-code-skills
cd /path/to/your-project
cp -R /tmp/dandy-code-skills/.agents/skills .agents/
cp -R /tmp/dandy-code-skills/.claude/skills .claude/
cp -R /tmp/dandy-code-skills/.opencode/skills .opencode/
```

## Skills

### `dandy-style`

Главный роутер. Нужен, когда денди-стиль используется внутри другой задачи.

```text
Отрефактори модуль оплаты в денди-стиле.
```

Агент должен оставить исходную задачу главной, открыть карту рецептов и загрузить только нужные правила.

### `dandy-review`

Ревью проекта, модуля, файла или diff.

```text
/dandy-review app/Services/OrderService.php
/dandy-review onboarding
```

`/dandy-start` — alias для первичного ревью: README, запуск, тестовые данные, тесты, структура, ответственные.

### `dandy-commit`

Проверка изменённого кода перед коммитом.

```text
/dandy-commit review-only
/dandy-commit fix-safe
```

Проверяет diff, сверяется со стилем проекта, ловит подозрительный AI-код и предлагает безопасные правки. Коммитить без прямого разрешения нельзя.

### `dandy-breakdown`

Разбор одного метода, класса, файла или вставленного куска кода.

```text
/dandy-breakdown app/Http/Controllers/CheckoutController.php
```

Объясняет, что делает код, почему его тяжело читать, какие рецепты подходят и как выглядит минимальная безопасная правка.

## Как это работает

Агент загружает правила лениво:

1. выбранный `SKILL.md`;
2. `dandy-style/source-map.md` для широкого ревью;
3. `dandy-style/recipe-map.md`;
4. только рецепты, которые подходят к задаче.

Так тратится меньше токенов, и агент не пытается применить все правила сразу.

## Структура пакета

```text
.agents/skills/          # источник правды
.claude/skills/          # wrappers для Claude Code
.opencode/skills/        # wrappers для OpenCode
bin/dandy-code-skills.mjs
package.json
```

## Хорошие промпты

```text
Проверь проект в денди-стиле.
Отрефактори модуль оплаты по правилам Денди-кода.
Проверь diff перед коммитом, как денди.
Разбери этот метод и предложи минимальную безопасную правку.
```

## Проверка

После изменений лучше спорить не вкусами, а инструментами:

- Laravel Pint / PSR-12 для форматирования;
- Pest или PHPUnit для поведения;
- статический анализ, если он уже используется в проекте.
