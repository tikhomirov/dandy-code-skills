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

### Interactive install

```bash
npx github:tikhomirov/dandy-code-skills install
```

In an interactive terminal the installer asks:

- install into this project or globally;
- project directory when local install is selected;
- target agent: all, `.agents`, Claude Code, or OpenCode;
- whether to remove old Dandy skills first.

In CI or non-interactive mode it uses safe defaults: local install into the current directory.

### Non-interactive examples

```bash
npx github:tikhomirov/dandy-code-skills install --yes
npx github:tikhomirov/dandy-code-skills install --global --yes
npx github:tikhomirov/dandy-code-skills install --target claude --yes
npx github:tikhomirov/dandy-code-skills install --path /path/to/project --yes
npx github:tikhomirov/dandy-code-skills install --dry-run
```

By default the installer removes old Dandy-owned skill entries before copying the new version. It does **not** delete the whole `skills` directory, so custom user skills should stay safe.

Use `--no-clean` to skip cleanup.

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

---

## Русский

Dandy Code Agent Skills — небольшой пакет skills для AI-агентов.

Он помогает агентам проверять и улучшать PHP/Laravel-код в духе книги **«Денди-код»**: понятный README, единый стиль, «дыхание» кода, честные имена, меньше магических значений, методы поменьше, ранние выходы, полезные комментарии, тесты, правила фреймворка, обновления и аккуратная проверка AI-кода.

## Установка

### Интерактивная установка

```bash
npx github:tikhomirov/dandy-code-skills install
```

В интерактивном терминале установщик спросит:

- куда ставить: в текущий проект или глобально;
- директорию проекта, если выбрана локальная установка;
- для какого агента ставить: все, `.agents`, Claude Code или OpenCode;
- удалять ли старые Dandy-skills перед установкой.

В CI или неинтерактивном режиме используются безопасные значения по умолчанию: локальная установка в текущую директорию.

### Примеры без вопросов

```bash
npx github:tikhomirov/dandy-code-skills install --yes
npx github:tikhomirov/dandy-code-skills install --global --yes
npx github:tikhomirov/dandy-code-skills install --target claude --yes
npx github:tikhomirov/dandy-code-skills install --path /path/to/project --yes
npx github:tikhomirov/dandy-code-skills install --dry-run
```

По умолчанию установщик удаляет старые Dandy-owned skills и затем копирует новую версию. Он **не удаляет всю папку** `skills`, поэтому пользовательские skills не должны пострадать.

Чтобы пропустить очистку, используй `--no-clean`.

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
