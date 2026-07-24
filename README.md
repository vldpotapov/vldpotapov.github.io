# Portfolio

Static portfolio site built with Astro. The main GitHub repository is `vldpotapov.github.io`, and Cloudflare Pages is connected to this repository.

Live Cloudflare Pages URL:

```text
https://vpotapov.pages.dev
```

## Current brand and sharing assets

Favicon files:

```text
public/favicon.svg
public/favicon-32.png
public/apple-touch-icon.png
```

Main menu logo:

```text
public/icons/main/logo-mark.svg
```

The visible top-left logo is split into two layers: the `P` shape is rendered inside `Header.astro` so it shares the same `mix-blend-mode` context as the navigation, while the orange dot is rendered from `BaseLayout.astro` as a separate non-blended layer.

Open Graph images for link previews:

```text
public/images/og/og-home.jpg
public/images/og/og-igb-live-2026.jpg
```

Recommended OG image size is `1200x630px`, JPG or PNG. The home/default preview image is connected in `src/layouts/BaseLayout.astro`. The IGB Live project uses its own preview image from `src/pages/projects/igb-live-2026.astro`.

Social links are edited in one place:

```text
src/data/site.ts
```

The same social data is used by the main hero, footer, mobile menu, and contact page.

Project cards are edited in one place:

```text
src/data/site.ts
```

The home page and `/projects` page use the same `projects` list. Cards alternate automatically: first image on the left, second image on the right, then left again.

Old project rows on the `/projects` page are edited in:

```text
src/data/site.ts
```

Use the `oldProjects` array for title, year, category, number, and link.
The row hover state is handled in `src/styles/global.css` by the `old-projects` styles: the accent layer expands from the vertical center, the number fades out, and the arrow fades in.
The `My Expertise` button on `/projects` links back to the home page section `/#expertise`.
The `/projects` page ends with the standard logo marquee and footer.

Button hover fill animation is controlled by `.button` styles in `src/styles/global.css`. Project cards use a desktop-only `View` cursor, also styled in `src/styles/global.css` and initialized in `src/layouts/BaseLayout.astro`.

Internal page transitions are handled globally in `src/layouts/BaseLayout.astro` and styled in `src/styles/global.css` with `.page-transition-overlay`, `.site-shell`, `is-page-leaving`, and `is-page-entering`.

Scroll-reveal header behavior is handled in `src/components/Header.astro` and styled in `src/styles/global.css` with `.site-header.is-floating` and `.site-header.is-visible`. It starts only after the first screen section and shows the header while scrolling up.

Cloudflare Pages accepts project files up to `25 MiB`. The active compressed campaign video is:

```text
public/videos/projects/igb-live-2026/Igb_london_26_short.mp4
```

## Рабочее правило

После заметных изменений в структуре сайта, страницах, данных, ассетах, деплое или командах нужно проверять этот README и сразу обновлять инструкцию, если она устарела.

Общее правило отступов: внешний горизонтальный отступ контентных блоков должен быть 20px на desktop и 16px на mobile. Это задается через `--page-pad` в `src/styles/global.css`. Внутренние отступы внутри кнопок, инпутов, тегов и карточек могут отличаться, если это часть компонента.

## Быстрый старт

Папка проекта:

```text
C:\Users\user\Documents\portfolio
```

Если терминал открыт не в этой папке:

```powershell
cd C:\Users\user\Documents\portfolio
```

Установить зависимости после скачивания проекта:

```powershell
npm.cmd install
```

Запустить сайт для работы:

```powershell
npm.cmd run dev
```

Локальный адрес обычно такой:

```text
http://localhost:4321/
```

Остановить локальный сервер:

```text
Ctrl + C
```

Проверить сборку перед публикацией:

```powershell
npm.cmd run build
```

Посмотреть собранную версию:

```powershell
npm.cmd run preview
```

Проверить обновления зависимостей:

```powershell
npm.cmd outdated
```

Обновить зависимости в рамках текущих версий:

```powershell
npm.cmd update
```

После обновления зависимостей обязательно:

```powershell
npm.cmd run build
```

Папку `dist` руками не редактировать. Это результат сборки, он пересоздается автоматически.

## GitHub repository

Основной репозиторий проекта:

```text
https://github.com/vldpotapov/vldpotapov.github.io
```

Этот репозиторий открывается как сайт:

```text
https://vldpotapov.github.io/
```

Локальный git remote:

```text
origin -> https://github.com/vldpotapov/vldpotapov.github.io.git
```

GitHub Pages должен публиковать сайт через GitHub Actions. Для этого в проекте есть workflow:

```text
.github/workflows/deploy-pages.yml
```

Он делает так:

1. Берет свежий код из ветки `main`.
2. Устанавливает зависимости.
3. Собирает Astro командой `npm run build`.
4. Публикует папку `dist` на GitHub Pages.

Важно: если на GitHub все еще показывается старый сайт, проверь в репозитории `vldpotapov.github.io`:

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

Чтобы отправить изменения на GitHub:

```powershell
git push origin main
```

Перед публикацией обязательно:

```powershell
npm.cmd run build
```

## Публикация на Cloudflare Pages

Рабочая схема:

1. Проверить сайт локально.
2. Запустить `npm.cmd run build`.
3. Сделать коммит в GitHub Desktop или через терминал.
4. Отправить изменения на GitHub.
5. Cloudflare Pages сам соберет и опубликует сайт из GitHub.

Настройки Cloudflare Pages:

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: /
```

Для формы контактов в Cloudflare Pages нужны переменные окружения:

```text
RESEND_API_KEY
CONTACT_FROM_EMAIL
```

`RESEND_API_KEY` - ключ API из Resend.  
`CONTACT_FROM_EMAIL` - подтвержденный отправитель в Resend, например `Portfolio <hello@yourdomain.com>`.

Адрес получателя по умолчанию уже прописан в коде:

```text
vpotapovcz@gmail.com
```

Если нужно временно переопределить получателя без правки кода, можно дополнительно добавить переменную:

```text
CONTACT_TO_EMAIL
```

После изменения переменных окружения нужно заново задеплоить сайт.

## Страницы

Сейчас сайт собран на английском языке. Переключатель `Ru` временно скрыт в `src/components/Header.astro`; когда начнем русскую версию, его можно вернуть в desktop и mobile меню.

```text
/                          src/pages/index.astro
/about                     src/pages/about.astro
/contact                   src/pages/contact.astro
/404                       src/pages/404.astro
/projects                  src/pages/projects/index.astro
/projects/igb-live-2026    src/pages/projects/igb-live-2026.astro
```

Общие компоненты:

```text
src/components/Header.astro
src/components/Footer.astro
src/components/LogoMarquee.astro
src/components/NameMarquee.astro
src/components/ProjectMedia.astro
src/components/ProjectSlider.astro
```

Основные стили:

```text
src/styles/global.css
```

## Где редактировать контент

Общие данные сайта:

```text
src/data/site.ts
```

Там находятся:

- `services` - секция Expertise на главной.
- `projects` - карточки проектов на главной.
- `moreProjects` - блок More Projects.
- `logos` - бегущая строка логотипов.

Данные страницы проекта:

```text
src/data/projectCases.ts
```

Контуры SVG-цифр:

```text
src/data/serviceNumbers.ts
```

Контент страниц About, Contact и 404 сейчас в самих файлах страниц:

```text
src/pages/about.astro
src/pages/contact.astro
src/pages/404.astro
```

## Главная

Основная страница:

```text
src/pages/index.astro
```

Карточки проектов редактируются в:

```text
src/data/site.ts
```

Пример карточки:

```ts
{
  title: "IGB Live 2026",
  year: "2024",
  slug: "/projects/igb-live-2026/",
  image: "/images/projects/igb-live-2026/home-card.png",
  imageAlt: "IGB Live 2026 project preview",
  summary: "Short project description.",
  tags: ["Exhibition Design", "Campaign Rollout", "Editorial Design"],
}
```

`slug` должен совпадать с реальным адресом страницы проекта.

Скорость бегущих строк регулируется в `src/styles/global.css` через CSS-переменные и animation duration для marquee-блоков.

## Проекты

Страница проекта:

```text
src/pages/projects/igb-live-2026.astro
```

Обычные правки проекта лучше делать здесь:

```text
src/data/projectCases.ts
```

Там можно менять:

- название проекта;
- тему `dark` или `light`;
- акцентный цвет;
- hero-картинку;
- тексты;
- таблицу Project at a Glance;
- картинки;
- видео;
- порядок и содержание блоков.

Папка картинок проекта:

```text
public/images/projects/igb-live-2026
```

Путь в коде пишется от папки `public`:

```ts
src: "/images/projects/igb-live-2026/hero.png"
```

Папка видео проекта:

```text
public/videos/projects/igb-live-2026
```

Путь в коде:

```ts
src: "/videos/projects/igb-live-2026/video.mp4"
```

Короткие оптимизированные mp4 можно хранить в проекте. Большие ролики лучше выносить на Vimeo, YouTube или другой видеохостинг.

Cloudflare Pages не публикует файлы больше 25 MiB. Тяжелые исходные видео нужно хранить вне `public`, например в:

```text
local-assets/videos
```

Папка `local-assets` добавлена в `.gitignore` и не отправляется на GitHub. Чтобы такое видео появилось на сайте, его нужно сначала сжать до размера меньше 25 MiB или загрузить на внешний видеохостинг.

Иконки проекта:

```text
public/icons/project
```

Слайдер проекта поддерживает несколько изображений, раскрытие по клику, полноэкранный режим, стрелки и закрытие. На мобильной версии изображения идут потоком.

Видео запускается при наведении на desktop. На мобильном работает по тапу, без стандартных UI-элементов. Для роликов без звука можно отключать кнопку звука в данных блока.

## About

Страница:

```text
src/pages/about.astro
```

Фото для hero:

```text
public/images/about
```

Секции:

- hero;
- Career Snapshot;
- Hard Skills;
- Experience & Education;
- CTA с кнопкой CV;
- логотипы;
- футер.

Плашки инструментов используют общий стиль `case-tools`, такой же как на странице проекта.

## Contact

Страница:

```text
src/pages/contact.astro
```

Форма отправляет запрос сюда:

```text
/api/contact
```

Cloudflare Function:

```text
functions/api/contact.ts
```

Состояния формы можно посмотреть без реальной отправки письма:

```text
/contact?formState=sending
/contact?formState=success
/contact?formState=error
```

Поле `Message` на странице Contact автоматически растет от 3 до 6 строк. После 6 строк внутри поля появляется скролл.

Социальные ссылки на странице Contact визуально работают как ссылки в hero/footer: иконка + текст, подчеркивание появляется при hover.

## 404

Страница:

```text
src/pages/404.astro
```

Цифры `404` сделаны через SVG-контуры, чтобы не было грязного рендера от `text-stroke`. Если нужно менять форму цифр, смотри:

```text
src/data/serviceNumbers.ts
```

## Ассеты

CV:

```text
public/files/Vladimir_Potapov_CV.pdf
```

Главные иконки:

```text
public/icons/main
```

UI-иконки:

```text
public/icons/ui
```

Социальные иконки:

```text
public/icons/social
```

Иконки инструментов:

```text
public/icons/tools
```

Логотипы для бегущей строки:

```text
public/images/logos
```

Чтобы добавить логотип:

1. Положи файл в `public/images/logos`.
2. Открой `src/data/site.ts`.
3. Добавь строку в массив `logos`.

Пример:

```ts
{ name: "New Logo", src: "/images/logos/new-logo.svg" }
```

## Figma MCP

Инструкция по подключению локального Figma Bridge:

```text
FIGMA_MCP_SETUP.md
```

Если после перезапуска компьютера Codex не видит Figma, открой этот файл и повтори шаги подключения.

Инструкция для локального экспорта выделенного фрейма из Figma в JSON:

```text
FIGMA_FRAME_EXPORT.md
```
