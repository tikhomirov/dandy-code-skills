# Dandy Code Skills

Source of truth for the v2 skill package.

Public entrypoints:

- `dandy-style` — core router and recipe map.
- `dandy-review` — review project/module/file/diff; `/dandy-start` is an onboarding alias.
- `dandy-commit` — check changed code before commit.
- `dandy-breakdown` — break down one selected code fragment.

Internal recipes live under `dandy-style/recipes`. They are not public entrypoints.

Load order:

1. selected `SKILL.md`;
2. `dandy-style/recipe-map.md`;
3. only relevant recipes.

Do not load every recipe by default.

---

# Dandy Code Skills

Источник правды для v2-пакета skills.

Публичные точки входа:

- `dandy-style` — ядро, роутер и карта рецептов.
- `dandy-review` — ревью проекта/модуля/файла/diff; `/dandy-start` — onboarding alias.
- `dandy-commit` — проверка изменённого кода перед коммитом.
- `dandy-breakdown` — разбор одного выбранного фрагмента кода.

Внутренние рецепты лежат в `dandy-style/recipes`. Это не публичные entrypoints.

Порядок загрузки:

1. выбранный `SKILL.md`;
2. `dandy-style/recipe-map.md`;
3. только релевантные рецепты.

Не загружай все рецепты по умолчанию.
