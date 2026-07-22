# Portfolio site notes

## Как открывать и запускать проект

Папка проекта:

```text
C:\Users\user\Documents\portfolio
```

Если открываешь терминал в VS Code, лучше открывать его уже внутри папки проекта. В терминале путь должен выглядеть примерно так:

```text
PS C:\Users\user\Documents\portfolio>
```

Если терминал открыт не в этой папке, перейди в проект командой:

```powershell
cd C:\Users\user\Documents\portfolio
```

### Первый запуск после скачивания проекта

Эта команда устанавливает все зависимости из `package.json`:

```powershell
npm.cmd install
```

Обычно ее нужно запускать один раз: после скачивания проекта или если была удалена папка `node_modules`.

### Обычный запуск сайта для работы

Эта команда запускает сайт локально:

```powershell
npm.cmd run dev
```

После запуска сайт обычно открывается здесь:

```text
http://localhost:4321/
```

Пока команда работает, сайт обновляется после сохранения файлов. Чтобы остановить сервер, нажми в терминале:

```text
Ctrl + C
```

### Проверить сборку перед публикацией

Перед тем как отправлять изменения на GitHub Pages, полезно проверить, что сайт собирается без ошибок:

```powershell
npm.cmd run build
```

Если ошибок нет, в терминале будет сообщение `Complete!`. Готовая собранная версия появляется в папке `dist`, но руками ее обычно редактировать не нужно.

### Посмотреть собранную версию

Если хочешь посмотреть именно собранный сайт, сначала сделай:

```powershell
npm.cmd run build
```

Потом запусти preview:

```powershell
npm.cmd run preview
```

### Обновить зависимости

Проверить, есть ли новые версии пакетов:

```powershell
npm.cmd outdated
```

Обновить зависимости в пределах разрешенных версий:

```powershell
npm.cmd update
```

После обновления обязательно проверь сборку:

```powershell
npm.cmd run build
```

Важно: большие обновления Astro лучше делать осторожно. Если сайт работает нормально, зависимости не обязательно постоянно обновлять.

### Коротко: основные команды

```powershell
cd C:\Users\user\Documents\portfolio
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
npm.cmd outdated
npm.cmd update
```

## Как настроить форму контактов на Cloudflare Pages

Форма на странице Contact отправляет данные в Cloudflare Pages Function:

```text
/api/contact
```

Для отправки письма используется Resend. В Cloudflare Pages нужно добавить переменные окружения:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

Что это значит:

- `RESEND_API_KEY` — ключ API из Resend.
- `CONTACT_TO_EMAIL` — почта, на которую будут приходить сообщения.
- `CONTACT_FROM_EMAIL` — адрес отправителя, подтвержденный в Resend. Например: `Portfolio <hello@yourdomain.com>`.

После добавления переменных нужно заново задеплоить сайт на Cloudflare Pages.

Логика формы:

- обычное состояние: `Send Message`;
- во время отправки: `Sending...`;
- если письмо отправилось: `Message sent.`;
- если ошибка: `Something went wrong.`;
- кнопки `Send another message` и `Try again` возвращают форму обратно.

## Где редактировать основные данные сайта

Основные списки сайта находятся здесь:

```text
src/data/site.ts
```

Там сейчас лежат:

- `services` — секция Expertise;
- `projects` — карточки проектов на главной;
- `moreProjects` — карточки на странице проекта;
- `logos` — бегущая строка логотипов.

## Как редактировать проекты на главной

Карточки в секции `Projects` редактируются здесь:

```text
src/data/site.ts
```

Нужный блок называется:

```ts
export const projects = [
  {
    title: "IGB Live London 2026",
    year: "2024",
    slug: "/projects/igb-live-2026/",
    image: "/images/projects/project-placeholder.png",
    imageAlt: "IGB Live London 2026 project preview",
    summary: "Short project description.",
    tags: ["Brand Strategy", "Logo Design", "Visual Identity"],
  },
];
```

Что значит каждое поле:

- `title` — название проекта на карточке.
- `year` — год в формате `(2024)`.
- `slug` — ссылка, куда ведет карточка. Это поле можно менять отдельно для каждого проекта. Например: `/projects/igb-live-2026/`.
- `image` — путь к картинке карточки. Сейчас можно временно использовать одну общую картинку: `/images/projects/project-placeholder.png`. Если оставить пустую строку `""`, будет показан CSS-плейсхолдер.
- `imageAlt` — короткое описание картинки для доступности.
- `summary` — описание проекта под заголовком.
- `tags` — список строк внизу карточки.

Картинки проектов складывай сюда:

```text
public/images/projects
```

Пример: если файл лежит здесь:

```text
public/images/projects/project-placeholder.png
```

то в `image` нужно указать так:

```ts
image: "/images/projects/project-placeholder.png",
```

Если хочешь временно использовать одну и ту же картинку для нескольких проектов, просто укажи одинаковый путь в поле `image` у каждого проекта:

```ts
image: "/images/projects/project-placeholder.png",
```

Чтобы добавить новый проект:

1. Положи картинку в `public/images/projects`.
2. Открой `src/data/site.ts`.
3. В блоке `export const projects` скопируй один проект целиком от `{` до `}`.
4. Вставь его ниже через запятую.
5. Замени `title`, `year`, `slug`, `image`, `imageAlt`, `summary` и `tags`.

## Как менять ссылку карточки проекта

У каждой карточки проекта ссылка задается в `src/data/site.ts` через поле `slug`:

```ts
{
  title: "IGB Live London 2026",
  slug: "/projects/igb-live-2026/",
}
```

Если у проекта должна быть своя страница, например:

```text
src/pages/projects/new-project.astro
```

то в `slug` нужно указать:

```ts
slug: "/projects/new-project/",
```

Важно: ссылка в `slug` должна совпадать с адресом существующей страницы. Если страницы пока нет, карточку можно временно вести на уже существующую страницу `/projects/igb-live-2026/`.

## Как редактировать ленту логотипов

Файлы логотипов лежат здесь:

```text
public/images/logos
```

Список логотипов, которые выводятся на сайте, редактируется здесь:

```text
src/data/site.ts
```

Нужный блок называется:

```ts
export const logos = [
  { name: "Airgun", src: "/images/logos/airgun.svg" },
];
```

Чтобы добавить новый логотип:

1. Положи файл в `public/images/logos`.
2. Открой `src/data/site.ts`.
3. Добавь новую строку в `export const logos`.

Пример:

```ts
{ name: "New Logo", src: "/images/logos/new-logo.svg" },
```

`name` нужен для описания логотипа, а `src` должен точно совпадать с именем файла.

Логотипы в обычном состоянии черно-белые, а при наведении становятся цветными. Это настроено в `src/styles/global.css` через `filter: grayscale()`.

## Как редактировать страницу проекта

Страница проекта `IGB Live London` находится здесь:

```text
src/pages/projects/igb-live-2026.astro
```

Но обычное редактирование лучше делать не в этом файле. Основной контент страницы вынесен сюда:

```text
src/data/projectCases.ts
```

Именно там меняются тексты, тема, акцентный цвет, картинки, видео и порядок блоков.

### Главное место для правок

В `src/data/projectCases.ts` сейчас есть объект:

```ts
export const motorSkinProject = {
  title: "IGB Live London",
  theme: "dark",
  accent: "#60f219",
};
```

Что можно менять:

- `title` — название проекта.
- `subtitle` — короткое описание проекта.
- `year`, `role`, `client`, `industry` — служебная информация.
- `theme` — тема страницы: `"dark"` или `"light"`.
- `accent` — акцентный цвет проекта, например `"#60f219"`.
- `cover` — картинка первого экрана.
- `statement` — крупный вступительный текст после hero.
- `glance` — таблица `Project at a Glance`.
- `sections` — все основные блоки страницы.

### Куда складывать картинки проекта

Для каждого проекта лучше делать отдельную папку:

```text
public/images/projects/igb-live-2026
```

Пример: если картинка лежит здесь:

```text
public/images/projects/igb-live-2026/hero.png
```

то в данных проекта путь пишется так:

```ts
src: "/images/projects/igb-live-2026/hero.png",
```

Пока настоящих картинок нет, можно использовать общий плейсхолдер:

```ts
src: "/images/projects/project-placeholder.png",
```

### Куда складывать видео

Короткие оптимизированные mp4 можно хранить здесь:

```text
public/videos/projects/igb-live-2026
```

Пример локального видео:

```ts
src: "/videos/projects/igb-live-2026/showreel.mp4",
poster: "/images/projects/igb-live-2026/video-poster.png",
```

Тяжелые ролики, showreel и длинные видео лучше хранить на Vimeo, YouTube или другом хостинге. Тогда в блоке видео можно использовать поле `embed`.

Практичное правило: короткий mp4 до нескольких мегабайт можно хранить в проекте, большие ролики лучше выносить на хостинг.

### Куда складывать иконки проекта

Новые иконки для страниц проектов складывай сюда:

```text
public/icons/project
```

Пример:

```text
public/icons/project/info.svg
public/icons/project/arrow-next.svg
```

В коде путь будет таким:

```ts
src: "/icons/project/info.svg",
```

### Какие блоки проекта уже заложены

Страница собирается из повторяемых блоков. Их можно переиспользовать для следующих проектов.

- `case-hero` — первый экран проекта.
- `case-statement` — крупный вводный текст после первого экрана.
- `case-glance` — таблица `Project at a Glance`.
- `case-intro` — концептуальный блок с callout-плашкой и большим изображением.
- `case-feature` — текст + крупное изображение.
- `case-story` — серия этапов проекта: текст + картинка, как в campaign architecture.
- `case-gallery` — слайдер на desktop и обычная лента картинок на mobile.
- `case-video` — видео, poster или внешний embed.
- `more-projects` — блок других проектов.

### Как добавить новый блок на страницу проекта

В `src/data/projectCases.ts` найди массив:

```ts
sections: [
  // блоки проекта
]
```

Каждый блок внутри массива отвечает за отдельную секцию страницы. Чтобы добавить новый блок, проще всего скопировать похожий блок и заменить тексты/картинки.

### Как работает слайдер

Слайдер находится в блоке:

```ts
type: "slider"
```

Максимум сейчас рассчитан на 5 изображений:

```ts
slides: [
  { src: "/images/projects/igb-live-2026/slide-1.png", alt: "Slide 1" },
  { src: "/images/projects/igb-live-2026/slide-2.png", alt: "Slide 2" },
]
```

На desktop выбранная картинка раскрывается по клику. При наведении свернутая картинка немного расширяется. На mobile слайдер отключается, и картинки идут обычным вертикальным потоком.

### Как сделать светлую или темную страницу

В `src/data/projectCases.ts` поменяй поле `theme`:

```ts
theme: "dark",
```

или:

```ts
theme: "light",
```

Акцентный цвет меняется отдельно:

```ts
accent: "#60f219",
```

Это удобно: один проект может быть темным с зеленым акцентом, другой светлым с красным, синим или любым другим цветом.

