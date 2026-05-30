# SKL Academy

Сайт IT-акадemia: [skl-academy.tech](https://skl-academy.tech)

## Структура

Многостраничный статический сайт. Чистые URL: `/about/`, `/programs/`, `/contact/`.

```
css/          — base, layout, components
partials/     — header, footer (подключаются через JS)
about/        — страница «О нас»
programs/     — программы
contact/      — контакты и форма
assets/icons/ — SVG-иконки
```

## Локальный просмотр

```bash
npx serve .
```

## Деплой

Push в `main` → GitHub Pages публикует автоматически.

Требования проекта — в локальном `REQUIREMENTS.md` (не в репозитории).