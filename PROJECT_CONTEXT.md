# Portfolio Project Context

Последнее обновление: 5 августа 2026.

Этот файл предназначен для передачи проекта другому AI-ассистенту или разработчику. Перед началом работы также нужно прочитать `README.md`, проверить `git status` и изучить файлы, относящиеся к конкретной задаче. Текущий код важнее устаревших описаний и старых макетов.

## 1. Что это за проект

Персональный сайт-портфолио Владимира Потапова, графического дизайнера и 3D-художника.

- Тип сайта: статический многостраничный сайт.
- Основной фреймворк: Astro.
- Стили: обычный CSS, разбитый по страницам и компонентам.
- JavaScript: только для интерактивных эффектов, меню, форм, слайдеров и видео.
- Репозиторий: `https://github.com/vldpotapov/vldpotapov.github.io`.
- Текущий публичный адрес: `https://vpotapov.pages.dev/`.
- Хостинг: Cloudflare Pages.
- Git-ветка для публикации: `main`.
- Интерфейс пока английский. Русская версия запланирована, но переключатель RU временно скрыт.

Пользователь понимает HTML/CSS, но почти не работает с JavaScript. Объяснения должны быть простыми, а редактируемый контент желательно хранить в понятных массивах и объектах.

## 2. Основные команды

Открыть терминал в корне проекта и использовать:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run dev -- --host
npm.cmd run build
npm.cmd run preview
```

Если dev-сервер завис или порт занят:

```powershell
npm.cmd run astro -- dev stop
npm.cmd run dev
```

Для просмотра с телефона в одной Wi-Fi сети запускать `npm.cmd run dev -- --host`, затем открывать IP компьютера с портом `4321`.

Перед коммитом обязательно:

```powershell
git diff --check
npm.cmd run build
git status --short
```

Не делать коммит или push без прямого запроса пользователя.

## 3. Структура страниц

### `/`

Главная страница: `src/pages/index.astro`.

Содержит:

- полноэкранный Hero с портретом;
- бесконечную строку имени;
- социальные ссылки;
- Intro с построчным заполнением текста цветом;
- Expertise со sticky-цифрами и 3D flip-переходом;
- карточки проектов;
- бесконечную строку логотипов;
- стандартный Footer.

Карточки Expertise сохраняют высокий внешний `.service` для работы sticky-цифр. Ссылкой является только `.service__body`, чтобы пустые промежутки не реагировали на наведение. На desktop показывается оранжевый курсор `Explore`.

### `/projects/`

Страница списка проектов: `src/pages/projects/index.astro`.

Содержит mini hero, шахматную сетку проектов, список старых проектов, CTA к Expertise, LogoMarquee и Footer.

### `/projects/igb-live-2026/`

Полноценный проект: `src/pages/projects/igb-live-2026.astro`.

Данные проекта находятся главным образом в `src/data/projectCases.ts`.

Особенности:

- тёмная тема и переменный акцент проекта;
- Hero с бегущим названием;
- Overview и Project at a Glance;
- Creative Concept, Visual Language и Campaign Architecture;
- story-карточки с медиа справа или слева;
- видео, которые запускаются при hover и продолжаются с остановленного кадра;
- часть видео имеет звук и круглую кнопку sound/mute, часть намеренно без звука;
- desktop-слайдеры и мобильный поток изображений;
- image lightbox;
- scroll-reveal направления задаются через `data-reveal`;
- More Projects, LogoMarquee и Footer находятся уже вне цветовой темы кейса.

Новые страницы проектов должны переиспользовать существующие компоненты и типы блоков, а не копировать их стили заново. Тема и акцент проекта должны оставаться переменными.

### `/expertise/brand-identity/`

Страница Expertise: `src/pages/expertise/brand-identity.astro`.

Содержит:

- mini hero;
- специальную scroll-сцену Hero/Overview;
- Brand Evolution и Digital Evolution;
- Building the Visual System;
- Selected Applications;
- Selected Projects;
- Explore Expertise;
- LogoMarquee и Footer.

Hero/Overview использует три слоя:

1. заголовок Brand Identity;
2. изображение поверх заголовка;
3. следующий контент поверх выбеленного изображения.

Сцена реализована через sticky, z-index, CSS-переменные и небольшой JavaScript без GSAP. На Android Chrome нельзя пересчитывать сцену при изменении только высоты viewport: появление панели браузера генерирует `resize` и раньше сбрасывало выбеливание. Полный пересчёт выполняется только при реальном изменении ширины или ориентации.

Скорость заголовка, дистанция выбеливания и удержание изображения находятся в `setupExpertiseHeroScroll()` на этой странице. Не менять их без конкретного запроса.

Медиа в многокадровых подблоках появляются последовательно с шагом `100ms`; подписи появляются отдельно. Вся секция Selected Projects появляется снизу одним блоком.

### `/about/`

Страница About: `src/pages/about.astro`.

Содержит Hero с текстом и портретом, Career Snapshot, Hard Skills, Experience & Education, CTA, LogoMarquee и Footer. Контент и массивы инструментов редактируются непосредственно в этом файле.

### `/contact/`

Страница Contact: `src/pages/contact.astro`.

Форма отправляет JSON в `/api/contact`. Все поля обязательны. Message начинается с трёх строк, растёт до шести строк, затем получает внутренний скролл. Состояния success/error показываются поверх формы.

Cloudflare Function: `functions/api/contact.ts`.

Переменные Cloudflare:

- `RESEND_API_KEY`;
- `CONTACT_TO_EMAIL`;
- `CONTACT_FROM_EMAIL`.

Никогда не записывать значения этих переменных или API-ключи в репозиторий.

### `/404.html`

Страница 404: `src/pages/404.astro`. Содержит светлый блок, SVG-число 404, текст, кнопку и стандартный Footer.

## 4. Данные и редактирование контента

### Общие данные

`src/data/site.ts`:

- `services` — карточки Expertise;
- `projects` — основные проекты;
- `oldProjects` — список старых проектов;
- `moreProjects` — временные карточки;
- `logos` — логотипы в бегущей строке;
- `socialLinks` и массивы социальных ссылок.

### Страница проекта

`src/data/projectCases.ts` содержит типы секций и контент IGB. Не превращать этот файл в HTML-строки. Новые повторяемые блоки сначала добавлять в типы/компоненты, затем заполнять данными.

### Expertise Brand Identity

В верхней части `src/pages/expertise/brand-identity.astro` находятся:

- `visualSystemItems`;
- `socialMediaImages`;
- `ebookImages`;
- `editorialEditionImages`;
- `keyVisualVideos`;
- `selectedProjects`.

Поле `description` может быть строкой или массивом строк. Массив выводится отдельными абзацами.

## 5. Ассеты

Все публичные файлы находятся в `public/` и доступны от корня URL.

- `public/images/hero` — Hero главной;
- `public/images/footer` — Footer;
- `public/images/about` — About;
- `public/images/logos` — LogoMarquee;
- `public/images/projects/<slug>` — изображения проекта;
- `public/videos/projects/<slug>` — видео и постеры проекта;
- `public/images/expertise/branding` — изображения Brand Identity;
- `public/videos/expertise/branding` — видео и постеры Brand Identity;
- `public/icons/ui` — интерфейсные иконки;
- `public/icons/social` — социальные иконки;
- `public/icons/tools` — иконки программ;
- `public/icons/project` — специальные иконки кейсов;
- `public/files/Vladimir_Potapov_CV.pdf` — CV.

Не использовать тяжёлые PNG там, где достаточно оптимизированного JPG. Перед удалением ассета найти все ссылки на него через `rg`.

Видео Cloudflare Pages должны быть меньше ограничения платформы. Видео без звука не должны показывать кнопку sound/mute.

## 6. CSS-архитектура

Точка входа: `src/styles/global.css`. Порядок импортов важен для каскада.

- `foundation.css` — токены, reset, базовая страница;
- `shared.css` — Header, Footer, кнопки, ссылки, Hero и marquee;
- `components/media-caption.css` — общие подписи медиа;
- `components/content-intro.css` — общие заголовочные блоки подразделов;
- `pages/home.css` — главная;
- `pages/expertise.css` — Expertise;
- `pages/about.css`, `contact.css`, `projects.css`, `not-found.css` — страницы;
- `pages/project/*` — страница проекта;
- `responsive/*` — общий адаптив;
- `motion.css` — keyframes и reduced-motion;
- `effects.css` — scroll reveal и lightbox.

Не добавлять локальные копии правил, которые уже есть в `media-caption.css` или `content-intro.css`.

## 7. Базовые визуальные правила

- Основной шрифт: Google Sans.
- Моноширинный шрифт: DM Mono.
- Построчное проявление текста `.intro-reveal` является общим эффектом для Intro главной, Overview экспертизы и Overview проекта. Не дублировать JavaScript: подключать `data-intro-reveal`. Для Overview использовать также общий класс `.overview-reveal-text` из `content-intro.css`; эталон типографики — страница проекта, цвета остаются контекстными через `--intro-reveal-base`, `--intro-reveal-color`, `--intro-reveal-accent`. На чёрном фоне проекта базовый непрокрашенный цвет — `var(--gray-31)`.
- Основной чёрный: `#151414`.
- Базовый оранжевый акцент: `#ff442b`.
- Desktop page padding: `20px`.
- Mobile page padding до `760px`: `16px`.
- Основная сетка: максимум `1440px` вместе с боковыми padding, контент обычно максимум `1400px`.
- Основные breakpoint: `1200`, `1100`, `960/940`, `820`, `760`.
- На mobile контент должен идти нормальным потоком без наложений и горизонтального скролла.
- Section label обычно `h2` и использует единый стиль `.section-label`.
- У секций после Hero часто есть верхняя линия `1px solid var(--gray-77)`.
- Не менять утверждённую типографику, сетку и отступы без запроса пользователя.
- Не добавлять декоративные карточки, градиентные шары или маркетинговые hero-композиции.

## 8. Header и Footer

Компоненты: `src/components/Header.astro` и `src/components/Footer.astro`.

- Header использует `mix-blend-mode: difference` для навигации.
- Логотип разделён на части, чтобы тёмная буква могла смешиваться с фоном, а оранжевая точка сохраняла цвет.
- На mobile открывается панель высотой `100vh` с затемнением контента; клик по backdrop закрывает меню.
- После первого экрана Header появляется при скролле вверх и скрывается при скролле вниз.
- Активным и некликабельным является только точное совпадение маршрута. На вложенной странице `/projects/igb-live-2026/` пункт Projects должен оставаться ссылкой.
- Footer повторяет общую композицию Hero, имеет бегущую строку и кнопку back to top.

## 9. Motion и интерактивность

### Page transition

Глобально находится в `src/layouts/BaseLayout.astro`, стили — в `foundation.css` и `motion.css`. Переход использует чёрный и оранжевый слои и scale сайта. Hash-ссылки и back-to-top не должны запускать page transition. Возврат кнопкой браузера должен сбрасывать transition через `pageshow`.

### Smooth scrolling

На desktop подключён `lenis` в `BaseLayout.astro`:

- `lerp: 0.12`;
- `wheelMultiplier: 0.9`;
- только `(hover: hover) and (pointer: fine)`;
- touch и reduced-motion используют нативный scroll.

### Scroll reveal

Общий атрибут:

```html
data-reveal="left|right|bottom"
data-reveal-delay="150"
```

Не анимировать section labels, если это не оговорено отдельно. Учитывать `prefers-reduced-motion`.

### Кастомные курсоры

- Карточки проекта: `View`.
- Карточки Expertise: `Explore` через `data-view-cursor`.
- Изображения/lightbox: `Zoom` и `Close`.
- Системный pointer всегда остаётся видимым поверх кастомного круга.
- Круг слегка отстаёт: `50ms` для View/Explore, `70ms` для Zoom/Close.
- На touch кастомные курсоры не работают.

### Marquee

NameMarquee и LogoMarquee должны быть бесшовными и работать в Safari/iOS. Контент дублируется для непрерывной анимации. Не менять ширину одной дорожки без проверки шва.

## 10. Компоненты, которые нужно переиспользовать

- `BaseLayout.astro`;
- `Header.astro`;
- `Footer.astro`;
- `LogoMarquee.astro`;
- `NameMarquee.astro`;
- `ProjectMedia.astro`;
- `ProjectSlider.astro`;
- `ImageLightbox.astro`;
- `MoreProjects.astro`;
- `ExploreExpertise.astro`;
- `LogoMark.astro`.

Не создавать новый компонент, если существующий уже решает ту же задачу с параметрами.

## 11. Деплой

Cloudflare Pages подключён к GitHub и автоматически публикует новые коммиты из `main`.

- Framework preset: Astro или ручная конфигурация.
- Build command: `npm run build`.
- Output directory: `dist`.
- Root directory: корень репозитория.

После push проверить статус deployment в Cloudflare. Контактная функция работает только в Cloudflare Pages environment; обычный локальный Astro-сервер показывает интерфейс, но не полностью воспроизводит production Function без отдельного Pages runtime.

## 12. Правила работы для следующего AI

1. Сначала прочитать этот файл, `README.md` и `SEO_RULES.md`.
2. Выполнить `git status --short`; не отменять чужие незакоммиченные изменения.
3. Найти существующую реализацию через `rg`, прежде чем писать новую.
4. Следовать текущей архитектуре Astro и CSS.
5. Не переписывать большие рабочие блоки ради небольшой правки.
6. Не менять утверждённые эффекты и значения «заодно».
7. Для ручных правок файлов использовать точечные изменения.
8. Документация поддерживается комплектом: после каждого изменения проверять `README.md`, `PROJECT_CONTEXT.md` и `SEO_RULES.md`, а при изменении архитектуры, поведения, контента, команд, ассетов, SEO или деплоя обновлять соответствующие документы в рамках той же задачи.
9. Запускать `git diff --check` и `npm.cmd run build`.
10. Для frontend-изменений проверять desktop и mobile; особо внимательно Android Chrome и Safari/iOS.
11. Не коммитить `dist`, `node_modules`, `.env`, API-ключи и временные экспорты.
12. Commit и push выполнять только по прямому запросу пользователя.
13. В финальном ответе кратко перечислять изменения и честно сообщать, какие проверки выполнены.

## 13. Работа с дизайном

Макеты создавались в Figma и Penpot. Подключение Figma MCP/локального bridge может быть нестабильным. Если дизайн нельзя прочитать напрямую:

- использовать свежий локальный экспорт выделенного фрейма;
- использовать PDF или PNG-скриншоты пользователя;
- не угадывать размеры, если пользователь просит точное соответствие;
- считать текущий код и явно указанный пользователем эталон источниками истины.

Подробные инструкции по Figma bridge и экспортам находятся в `README.md`.
