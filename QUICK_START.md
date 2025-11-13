# Быстрый старт

## ✅ Проект готов к работе!

Все зависимости установлены, SCSS скомпилирован в CSS и минифицирован.

## 🚀 Команды для работы

### Запуск режима разработки (рекомендуется)
```bash
npm run dev
```
Эта команда:
- Запустит автоматическую компиляцию SCSS при изменениях
- Откроет локальный сервер на http://localhost:3000
- Автоматически обновит страницу при изменениях

### Только компиляция SCSS (с отслеживанием изменений)
```bash
npm run scss
```

### Сборка проекта (без отслеживания)
```bash
npm run build
```

## 📁 Структура проекта

```
Окна/
├── src/
│   ├── scss/                    # SCSS исходники
│   │   ├── abstracts/           # Переменные, миксины, функции
│   │   │   ├── _variables.scss  # Все переменные проекта
│   │   │   ├── _mixins.scss     # Переиспользуемые миксины
│   │   │   └── _functions.scss  # SCSS функции
│   │   ├── base/                # Базовые стили
│   │   │   ├── _reset.scss      # Сброс стилей
│   │   │   ├── _typography.scss # Типография
│   │   │   └── _utilities.scss  # Утилитарные классы
│   │   ├── components/          # Компоненты
│   │   │   ├── _buttons.scss    # Кнопки
│   │   │   ├── _forms.scss      # Формы
│   │   │   ├── _cards.scss      # Карточки
│   │   │   └── _modal.scss      # Модальные окна
│   │   ├── layout/              # Макет
│   │   │   ├── _header.scss     # Шапка
│   │   │   ├── _footer.scss     # Подвал
│   │   │   ├── _navigation.scss # Навигация
│   │   │   └── _grid.scss       # Сетка
│   │   ├── pages/               # Стили страниц
│   │   │   ├── _home.scss       # Главная
│   │   │   ├── _about.scss      # О нас
│   │   │   └── _contact.scss    # Контакты
│   │   └── main.scss            # Главный файл (импорт всех модулей)
│   └── js/                      # JavaScript
│       ├── main.js              # Основной JS
│       ├── components.js        # Компоненты (слайдеры, табы и т.д.)
│       └── utils.js             # Утилиты
├── dist/
│   └── css/                     # Скомпилированные CSS
│       ├── main.css             # Обычный CSS
│       └── main.min.css         # Минифицированный CSS
├── assets/
│   ├── images/                  # Изображения
│   ├── fonts/                   # Шрифты
│   └── icons/                   # Иконки
├── pages/                       # HTML страницы
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   └── contact.html
└── index.html                   # Главная страница
```

## 💡 Как работать с SCSS

### 1. Изменение переменных
Откройте `src/scss/abstracts/_variables.scss` и измените нужные переменные:
```scss
$color-primary: #007bff;  // Основной цвет
$font-primary: 'Arial';   // Основной шрифт
```

### 2. Добавление новых стилей
- Для компонентов: создайте файл в `src/scss/components/`
- Для страниц: создайте файл в `src/scss/pages/`
- Не забудьте импортировать в `src/scss/main.scss`

### 3. Использование миксинов
```scss
.my-element {
  @include flex-center;  // Центрирование
  @include tablet {      // Адаптив для планшетов
    display: block;
  }
}
```

## 🎨 Готовые компоненты

В проекте уже есть стили для:
- ✅ Кнопки (`.btn`, `.btn--primary`, `.btn--outline`)
- ✅ Формы (`.form__input`, `.form__textarea`)
- ✅ Карточки (`.card`)
- ✅ Модальные окна (`.modal`)
- ✅ Сетка (`.grid--2`, `.grid--3`, `.grid--4`)
- ✅ Утилиты (`.container`, `.text-center`, `.mt-md`, и т.д.)

## 📱 Адаптивность

Проект использует mobile-first подход с breakpoints:
- Mobile: до 480px
- Tablet: до 768px
- Desktop: от 1024px
- Wide: от 1280px

## 🔧 Дополнительно

### Добавление новой страницы
1. Создайте HTML файл в папке `pages/`
2. Скопируйте структуру из существующих страниц
3. При необходимости создайте SCSS файл в `src/scss/pages/`
4. Импортируйте его в `src/scss/main.scss`

### Работа с изображениями
Поместите изображения в `assets/images/` и используйте:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

Удачной работы! 🚀
