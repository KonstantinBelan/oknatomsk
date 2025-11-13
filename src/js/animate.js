// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Объект для управления видимостью элементов
const ScrollVisibility = {
  selectors: [], // Начальные селекторы
  animations: new Map(), // Храним анимации для каждого элемента
  defaultClassName: 'visible', // Класс по умолчанию

  init: function () {
    this.selectors.forEach(selector => {
      this.createAnimation(selector)
    })
  },

  createAnimation: function (selector, className = this.defaultClassName) {
    const elements = document.querySelectorAll(selector)

    elements.forEach((element, index) => {
      // Создаем уникальный ключ для элемента
      const elementKey = `${selector}-${className}-${index}`

      const animation = gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleClass: {
            targets: element,
            className: className,
          },
          markers: true,
        },
      })

      // Сохраняем анимацию и информацию о ней
      this.animations.set(elementKey, {
        animation: animation,
        element: element,
        selector: selector,
        className: className,
      })
    })
  },

  // Добавить новый элемент
  addElement: function (selector, className = this.defaultClassName) {
    if (!this.selectors.includes(selector)) {
      this.selectors.push(selector)
    }
    this.createAnimation(selector, className)
    // console.log('Добавлен элемент:', selector, 'с классом:', className)
  },

  // Добавить несколько элементов
  addElements: function (selectorsArray) {
    selectorsArray.forEach(item => {
      if (typeof item === 'string') {
        this.addElement(item)
      } else if (typeof item === 'object' && item.selector) {
        this.addElement(item.selector, item.className || this.defaultClassName)
      }
    })
  },

  // Удалить элемент (с возможностью указать конкретный класс)
  removeElement: function (selector, className = null) {
    let removedCount = 0

    // Находим и убиваем анимации для этого селектора
    for (let [key, data] of this.animations.entries()) {
      const matchSelector = data.selector === selector
      const matchClassName = className === null || data.className === className

      if (matchSelector && matchClassName) {
        // Удаляем класс если он был добавлен через GSAP
        if (data.element.classList.contains(data.className)) {
          data.element.classList.remove(data.className)
        }

        // Убиваем ScrollTrigger и анимацию
        if (data.animation.scrollTrigger) {
          data.animation.scrollTrigger.kill()
        }
        data.animation.kill()

        // Удаляем из Map
        this.animations.delete(key)
        removedCount++
      }
    }

    // ДОПОЛНЕНИЕ: Если класс указан, принудительно удаляем его из всех элементов селектора
    if (className) {
      const elements = document.querySelectorAll(selector)
      elements.forEach(element => {
        if (element.classList.contains(className)) {
          element.classList.remove(className)
          // console.log(`Принудительно удален класс "${className}" из элемента ${selector}`)
        }
      })
    }

    // Если удалены все анимации для этого селектора, удаляем из массива селекторов
    if (className === null) {
      const hasRemainingAnimations = Array.from(this.animations.values()).some(data => data.selector === selector)
      if (!hasRemainingAnimations) {
        this.selectors = this.selectors.filter(s => s !== selector)
      }
    }

    const classInfo = className ? ` с классом ${className}` : ''
    // console.log(`Удален элемент: ${selector}${classInfo} (удалено анимаций: ${removedCount})`)
    return removedCount
  },

  // Удалить несколько элементов (с возможностью указать классы)
  removeElements: function (itemsArray) {
    itemsArray.forEach(item => {
      if (typeof item === 'string') {
        this.removeElement(item)
      } else if (typeof item === 'object' && item.selector) {
        this.removeElement(item.selector, item.className || null)
      }
    })
  },

  // Получить информацию об анимациях элемента
  getElementInfo: function (selector, className = null) {
    const info = []
    for (let [key, data] of this.animations.entries()) {
      const matchSelector = data.selector === selector
      const matchClassName = className === null || data.className === className

      if (matchSelector && matchClassName) {
        info.push({
          element: data.element,
          className: data.className,
          scrollTrigger: data.animation.scrollTrigger,
          key: key,
        })
      }
    }
    return info
  },

  // Обновить класс для элемента
  updateElementClass: function (selector, newClassName, oldClassName = null) {
    // Сначала удаляем старые анимации (только с указанным классом если передан)
    const removedCount = this.removeElement(selector, oldClassName)

    // Затем создаем новые с обновленным классом
    if (removedCount > 0) {
      this.addElement(selector, newClassName)
      // console.log(`Обновлен класс для ${selector}: ${newClassName}`)
    } else {
      // console.log(`Элемент ${selector} не найден для обновления`)
    }
  },

  // Принудительно удалить класс из DOM (без поиска анимаций)
  forceRemoveClass: function (selector, className) {
    const elements = document.querySelectorAll(selector)
    let removedCount = 0

    elements.forEach(element => {
      if (element.classList.contains(className)) {
        element.classList.remove(className)
        removedCount++
      }
    })

    // console.log(`Принудительно удален класс "${className}" из ${removedCount} элементов ${selector}`)
    return removedCount
  },

  // Генератор уникального ID
  generateId: function () {
    return Math.random().toString(36).substr(2, 9)
  },

  // Получить статистику
  getStats: function () {
    const classStats = {}
    Array.from(this.animations.values()).forEach(data => {
      classStats[data.className] = (classStats[data.className] || 0) + 1
    })

    return {
      selectors: this.selectors,
      totalAnimations: this.animations.size,
      classStats: classStats,
      animations: Array.from(this.animations.entries()),
    }
  },
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', function () {
  // ScrollVisibility.init()
  // ScrollVisibility.removeElement('.hero', 'animate-hero')
  // Добавляем hero с классом по умолчанию
  // ScrollVisibility.addElement('.hero')
  // Примеры использования:
  // Добавление элементов с разными классами
  // ScrollVisibility.addElement('.features', 'fade-in')
  // ScrollVisibility.addElement('.about', 'slide-up')
  // ScrollVisibility.addElement('.hero', 'secondary-class') // Второй класс для hero
  // Добавление нескольких элементов с разными классами
  // ScrollVisibility.addElements([
  //   { selector: '.portfolio', className: 'zoom-in' },
  //   { selector: '.contact', className: 'visible' },
  //   '.testimonial' // Будет использован класс по умолчанию
  // ])
  // Удаление элементов с указанием класса
  // ScrollVisibility.removeElement('.hero', 'secondary-class') // Удалить только secondary-class у hero
  // ScrollVisibility.removeElement('.hero') // Удалить все анимации hero
  // Удаление нескольких элементов с классами
  // ScrollVisibility.removeElements([
  //   '.features', // Удалить все анимации features
  //   { selector: '.hero', className: 'visible' }, // Удалить только visible у hero
  //   { selector: '.about', className: 'slide-up' } // Удалить только slide-up у about
  // ])
  // Обновление класса для элемента
  // ScrollVisibility.updateElementClass('.hero', 'hero-visible', 'visible') // Заменить visible на hero-visible
})

// Делаем объект глобальным для доступа из консоли
window.ScrollVisibility = ScrollVisibility
