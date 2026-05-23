<p align="center">
  <a href="https://github.com/tabuna/dandy-code">
    <img src="https://raw.githubusercontent.com/tabuna/dandy-code/main/assets/img/top-hat.svg" width="96" alt="Dandy Code" />
  </a>
</p>

<h1 align="center">Dandy Code Agent Skills</h1>

<p align="center">
  Skills for AI coding agents inspired by <a href="https://github.com/tabuna/dandy-code">«Денди-код»</a>.
</p>

<p align="center">
  <a href="https://github.com/tikhomirov/dandy-code-skills/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/tikhomirov/dandy-code-skills?style=flat-square"></a>
  <a href="https://github.com/tikhomirov/dandy-code-skills/blob/main/package.json"><img alt="Node" src="https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white"></a>
  <a href="https://github.com/tikhomirov/dandy-code-skills/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square"></a>
  <img alt="Agents" src="https://img.shields.io/badge/agents-Claude%20Code%20%7C%20OpenCode%20%7C%20.agents-purple?style=flat-square">
</p>

<p align="center">
  <a href="https://github.com/tabuna/dandy-code">Book repository</a> ·
  <a href="https://raw.githubusercontent.com/tabuna/dandy-code/refs/heads/main/export/Dandy%20Code.pdf">PDF</a> ·
  <a href="https://github.com/tikhomirov/dandy-code-skills/releases">Releases</a>
</p>

---

## English

Dandy Code Agent Skills is a small skill package for AI coding agents.

It helps agents review and improve PHP/Laravel code in the spirit of the book **«Денди-код»**: readable README, consistent style, visual breathing, honest names, fewer magic values, smaller methods, early returns, useful comments, tests, framework rules, upgrades, and careful AI-generated code review.

## Install

### Local install into a project

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

### Global install for user-level agents

```bash
npx github:tikhomirov/dandy-code-skills install --global
```

Global mode installs into user-level directories:

```text
~/.agents/skills
~/.claude/skills
~/.config/opencode/skills
```

The installer is written in Node.js and uses cross-platform filesystem APIs, so it should work on Linux, macOS, and Windows.

### Target one agent

```bash
npx github:tikhomirov/dandy-code-skills install --target agents
npx github:tikhomirov/dandy-code-skills install --target claude
npx github:tikhomirov/dandy-code-skills install --target opencode
```

Useful options:

```bash
npx github:tikhomirov/dandy-code-skills install --path /path/to/project
npx github:tikhomirov/dandy-code-skills install --dry-run
```

## Skills

| Skill | Use when |
|---|---|
| `dandy-style` | Dandy style is a constraint inside another task. |
| `dandy-review` | You need a review of a project, module, file, or diff. |
| `dandy-commit` | You want to check changed code before commit. |
| `dandy-breakdown` | You want to analyze one method, class, file, or snippet. |

Good prompts:

```text
Review this project in dandy style.
Refactor the payment module using Dandy Code rules.
Check the diff before commit, like a dandy.
Break down this method like a dandy.
```

## How it works

Agents load the package lazily:

1. selected `SKILL.md`;
2. `dandy-style/source-map.md` for broad reviews;
3. `dandy-style/recipe-map.md`;
4. only recipes that fit the task.

This keeps token usage lower and prevents the agent from applying every rule to every request.

---

## Русский

Dandy Code Agent Skills — небольшой пакет skills для AI-агентов.

Он помогает агентам проверять и улучшать PHP/Laravel-код в духе книги **«Денди-код»**: понятный README, единый стиль, «дыхание» кода, честные имена, меньше магических значений, методы поменьше, ранние выходы, полезные комментарии, тесты, правила фреймворка, обновления и аккуратная проверка AI-кода.

## Установка

### Локально в проект

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

### Глобально для пользовательских агентов

```bash
npx github:tikhomirov/dandy-code-skills install --global
```

Глобальная установка кладёт skills в пользовательские директории:

```text
~/.agents/skills
~/.claude/skills
~/.config/opencode/skills
```

Установщик написан на Node.js и использует кроссплатформенный API файловой системы, поэтому должен работать на Linux, macOS и Windows.

### Только для одного агента

```bash
npx github:tikhomirov/dandy-code-skills install --target agents
npx github:tikhomirov/dandy-code-skills install --target claude
npx github:tikhomirov/dandy-code-skills install --target opencode
```

Полезные опции:

```bash
npx github:tikhomirov/dandy-code-skills install --path /path/to/project
npx github:tikhomirov/dandy-code-skills install --dry-run
```

## Skills

| Skill | Когда использовать |
|---|---|
| `dandy-style` | Денди-стиль нужен внутри другой задачи. |
| `dandy-review` | Нужно ревью проекта, модуля, файла или diff. |
| `dandy-commit` | Нужно проверить изменения перед коммитом. |
| `dandy-breakdown` | Нужно разобрать один метод, класс, файл или фрагмент. |

Хорошие промпты:

```text
Проверь проект в денди-стиле.
Отрефактори модуль оплаты по правилам Денди-кода.
Проверь diff перед коммитом, как денди.
Разбери метод, он должен быть как денди.
```

## Как это работает

Агент загружает пакет лениво:

1. выбранный `SKILL.md`;
2. `dandy-style/source-map.md` для широкого ревью;
3. `dandy-style/recipe-map.md`;
4. только рецепты, которые подходят к задаче.

Так тратится меньше токенов, и агент не пытается применить все правила сразу.
