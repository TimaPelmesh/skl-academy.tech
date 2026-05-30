# SKL Academy

Сайт [skl-academy.tech](https://skl-academy.tech) — образовательная платформа с бесплатными IT-курсами.

## Структура

```
index.html          — главная
about/index.html    — о проекте (/about/)
courses/            — все курсы (урок: courses/python/01-python-basics/index.html → URL …/01-python-basics/)
articles/           — статьи SKL Library
library.html        — библиотека статей
sandbox/            — интерактивные тренажёры
desk/               — рабочий стол с терминалом
styles.css          — стили главной
courses/courses.css — стили страниц курсов
```

## Локальный просмотр

```bash
npx serve .
```

## Деплой

Push в ветку `main` → GitHub Pages.

Ссылки на уроки ведут со **слешем в конце** (канонический URL без `.html`). Старые адреса `*.html` оставлены как страницы-редиректы.

Требования проекта — в локальном `REQUIREMENTS.md`.