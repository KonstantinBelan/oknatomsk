// Главный JavaScript файл

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger')
  const mobileNav = document.getElementById('mobileNav')
  const closeButton = document.getElementById('closeMobileNav')

  // Функция для закрытия мобильного меню
  const closeMobileMenu = () => {
    mobileNav.classList.remove('active')
    burger.classList.remove('active')
    document.body.style.overflow = ''
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('active')
      burger.classList.toggle('active')
      document.body.style.overflow = 'hidden'
    })

    // Закрытие мобильного меню по кнопке закрытия
    if (closeButton) {
      closeButton.addEventListener('click', closeMobileMenu)
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        closeMobileMenu()
      }
    })

    // Закрытие мобильного меню при клике на ссылку (опционально)
    mobileNav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', e => {
        // Если это не ссылка с подменю, закрываем меню
        if (!link.parentElement.classList.contains('has-submenu')) {
          closeMobileMenu()
        }
      })
    })
  }

  // Работа подменю в мобильном меню
  const submenuItems = document.querySelectorAll('.nav__item.has-submenu')

  submenuItems.forEach(item => {
    const link = item.querySelector('.nav__link')
    const submenu = item.querySelector('.nav__submenu')

    if (link && submenu) {
      link.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation() // Предотвращаем всплытие, чтобы не сработало закрытие меню

        // Закрываем все остальные подменю
        submenuItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherSubmenu = otherItem.querySelector('.nav__submenu')
            if (otherSubmenu) {
              otherSubmenu.classList.remove('active')
            }
          }
        })

        // Переключаем текущее подменю
        submenu.classList.toggle('active')
      })
    }
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        // Закрываем мобильное меню после клика по якорной ссылке
        if (mobileNav && mobileNav.classList.contains('active')) {
          closeMobileMenu()
        }
      }
    })
  })

  // Закрытие мобильного меню при нажатии на Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      closeMobileMenu()
    }
  })
})

// Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add('active')
    document.body.style.overflow = 'hidden'
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove('active')
    document.body.style.overflow = ''
  }
}

// Close modal on outside click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target.id)
  }
})

// Form validation example
function validateForm(formId) {
  const form = document.getElementById(formId)
  if (!form) return false

  const inputs = form.querySelectorAll('input[required], textarea[required]')
  let isValid = true

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false
      input.classList.add('error')
    } else {
      input.classList.remove('error')
    }
  })

  return isValid
}

// Добавляем класс к первому слову
document.querySelectorAll('.services__item-price p').forEach(element => {
  const words = element.innerHTML.split(' ')
  if (words.length > 0 && words[0].toLowerCase() === 'от') {
    words[0] = `<span class="first-word">${words[0]}</span>`
    element.innerHTML = words.join(' ')
  }
})

// Show description on hover
document.querySelectorAll('.services__item').forEach(element => {
  element.addEventListener('mouseover', () => {
    element.querySelector('.services__item-desc').classList.add('visible')
  })
  element.addEventListener('mouseout', () => {
    element.querySelector('.services__item-desc').classList.remove('visible')
  })
})

// Slick slider initialization
$('.stocks__slider-container').slick({
  dots: true,
  infinite: false,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: document.querySelector('.stocks .section__arrows-prev'),
  nextArrow: document.querySelector('.stocks .section__arrows-next'),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
})

$('.reviews__slider-container').slick({
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: document.querySelector('.reviews .section__arrows-prev'),
  nextArrow: document.querySelector('.reviews .section__arrows-next'),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
})

function priceTable() {
  const priceSection = document.querySelector('section.price')
  if (!priceSection) return

  const priceListItems = priceSection.querySelectorAll('.price__item')
  if (priceListItems.length === 0) return

  priceListItems[0].classList.add('visible')

  priceSection.addEventListener('click', e => {
    const header = e.target.closest('.price__header')
    if (!header) return

    const item = e.target.closest('.price__item')
    if (!item) return

    const itemOpen = item.querySelector('.price__open p')
    if (!itemOpen) return

    if (item.classList.contains('visible')) {
      item.classList.remove('visible')
      itemOpen.textContent = 'Развернуть'
    } else {
      item.classList.add('visible')
      itemOpen.textContent = 'Свернуть'
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  priceTable()
})

document.addEventListener('DOMContentLoaded', function () {
  const seoSection = document.querySelector('.seo')
  if (!seoSection) return

  const seoInfo = seoSection.querySelector('.seo__info')
  const seoMore = seoSection.querySelector('.seo__more')

  // Функция для обрезки текста
  function truncateText() {
    const lineHeight = parseInt(getComputedStyle(seoInfo).lineHeight)
    const maxHeight = lineHeight * 4

    seoInfo.style.height = maxHeight + 'px'
    seoInfo.style.overflow = 'hidden'
    seoMore.textContent = 'Читать далее'
    seoInfo.classList.remove('expanded')
  }

  // Функция для раскрытия текста
  function expandText() {
    // Временно убираем ограничение для расчета полной высоты
    seoInfo.style.height = 'none'
    const fullHeight = seoInfo.scrollHeight

    // Возвращаем текущую высоту перед началом анимации
    const currentHeight = seoInfo.clientHeight
    seoInfo.style.height = currentHeight + 'px'

    // Даем браузеру время на применение стиля
    requestAnimationFrame(() => {
      // Запускаем анимацию к полной высоте
      seoInfo.style.height = fullHeight + 'px'
      seoMore.textContent = 'Свернуть'
      seoInfo.classList.add('expanded')
    })

    // После завершения анимации убираем ограничение
    setTimeout(() => {
      if (seoInfo.classList.contains('expanded')) {
        seoInfo.style.height = 'none'
      }
    }, 300)
  }

  // Инициализация
  truncateText()

  // Обработчик клика
  seoMore.addEventListener('click', function () {
    if (seoInfo.classList.contains('expanded')) {
      truncateText()
    } else {
      expandText()
    }
  })

  // Обработчик изменения размера окна
  window.addEventListener('resize', function () {
    if (!seoInfo.classList.contains('expanded')) {
      truncateText()
    }
  })
})

// Закрытие меню при клике вне его области
document.addEventListener('click', function (e) {
  const servicesWrapper = document.querySelector('.header__services-wrapper')
  if (!servicesWrapper.contains(e.target)) {
    const item = document.querySelector('.header__services')
    const menu = document.querySelector('.header__services-menu')
    const menuBg = document.querySelector('.menu__bg')
    menu.style.opacity = '0'
    menu.style.visibility = 'hidden'
    menu.style.transform = 'translateY(-10px)'
    menuBg.style.display = 'none'
    item.classList.remove('active')
  }
})

// Обработка клика на кнопку "Услуги"
document.querySelector('.header__services').addEventListener('click', function (e) {
  e.preventDefault()
  const item = e.target.closest('.header__services')
  const menu = document.querySelector('.header__services-menu')
  const menuBg = document.querySelector('.menu__bg')
  item.classList.add('active')
  menuBg.style.display = 'block'

  const isVisible = menu.style.visibility === 'visible'

  if (isVisible) {
    menu.style.opacity = '0'
    menu.style.visibility = 'hidden'
    menu.style.transform = 'translateY(-10px)'
    menuBg.style.display = 'none'
    item.classList.remove('active')
  } else {
    menu.style.opacity = '1'
    menu.style.visibility = 'visible'
    menu.style.transform = 'translateY(0)'
    menuBg.style.display = 'block'
    item.classList.add('active')
  }
})

class Modal {
  constructor() {
    this.modals = new Map()
    this.init()
  }

  init() {
    this.createModals()
    this.bindEvents()
  }

  createModals() {
    // Находим все модальные окна на странице
    document.querySelectorAll('.modal').forEach(modal => {
      const modalName = modal.dataset.modalName || 'default'
      this.modals.set(modalName, modal)
    })
  }

  bindEvents() {
    // Обработчики для кнопок открытия
    document.addEventListener('click', e => {
      if (e.target.closest('.modal-open')) {
        const button = e.target.closest('.modal-open')
        const modalName = button.dataset.modalName || 'default'
        const tariffName = button.dataset.tariffName
        const stockName = button.dataset.stockName
        this.open(modalName, { tariffName, stockName })
      }
    })

    // Обработчики для кнопок закрытия
    document.addEventListener('click', e => {
      if (e.target.closest('.modal-close') || e.target.closest('.modal__close')) {
        const modalElement = e.target.closest('.modal')
        if (modalElement) {
          this.close(modalElement)
        }
      }
    })

    // Закрытие по клику на фон
    document.addEventListener('click', e => {
      if (e.target.classList.contains('modal')) {
        this.close(e.target)
      }
    })

    // Закрытие по ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeAll()
      }
    })

    // Предотвращение закрытия при клике на контент
    document.addEventListener('click', e => {
      if (e.target.closest('.modal__content')) {
        e.stopPropagation()
      }
    })
  }

  open(modalName, data = {}) {
    const modal = this.modals.get(modalName)
    if (!modal) return

    // Закрываем все открытые модалки перед открытием новой
    this.closeAll()

    // Добавляем скрытые поля с данными, если они переданы
    if (data.tariffName) {
      this.addHiddenInput(modal, 'tariff', data.tariffName)
    }

    if (data.stockName) {
      this.addHiddenInput(modal, 'stock', data.stockName)
    }

    // Блокируем скролл body
    document.body.style.overflow = 'hidden'

    // Добавляем классы для анимации
    modal.classList.add('active')

    // Запускаем анимацию появления
    setTimeout(() => {
      modal.classList.add('visible')
    }, 10)
  }

  close(modalElement) {
    if (!modalElement.classList.contains('active')) return

    // Удаляем все временные скрытые поля
    this.removeAllHiddenInputs(modalElement)

    // Убираем видимость для анимации закрытия
    modalElement.classList.remove('visible')

    // После завершения анимации убираем активный класс
    setTimeout(() => {
      modalElement.classList.remove('active')

      // Разблокируем скролл, если нет других открытых модалок
      if (!document.querySelector('.modal.active')) {
        document.body.style.overflow = ''
      }
    }, 150)
  }

  closeAll() {
    document.querySelectorAll('.modal.active').forEach(modal => {
      this.close(modal)
    })
  }

  addHiddenInput(modalElement, fieldName, fieldValue) {
    // Находим форму в модальном окне
    const form = modalElement.querySelector('form')
    if (!form) return

    // Удаляем предыдущее поле с таким же именем, если оно есть
    this.removeHiddenInput(modalElement, fieldName)

    // Создаем новое скрытое поле
    const hiddenInput = document.createElement('input')
    hiddenInput.type = 'hidden'
    hiddenInput.name = fieldName
    hiddenInput.value = fieldValue
    hiddenInput.className = `hidden-input hidden-input--${fieldName}`

    // Добавляем поле в форму
    form.appendChild(hiddenInput)

    // Сохраняем информацию о добавленных полях
    if (!modalElement.dataset.hiddenInputs) {
      modalElement.dataset.hiddenInputs = ''
    }
    modalElement.dataset.hiddenInputs += `${fieldName},`
  }

  removeHiddenInput(modalElement, fieldName) {
    const form = modalElement.querySelector('form')
    if (!form) return

    // Находим и удаляем скрытое поле
    const hiddenInput = form.querySelector(`.hidden-input--${fieldName}`)
    if (hiddenInput) {
      hiddenInput.remove()
    }

    // Обновляем информацию о добавленных полях
    if (modalElement.dataset.hiddenInputs) {
      const fields = modalElement.dataset.hiddenInputs.split(',').filter(f => f && f !== fieldName)
      modalElement.dataset.hiddenInputs = fields.join(',')
    }
  }

  removeAllHiddenInputs(modalElement) {
    const form = modalElement.querySelector('form')
    if (!form) return

    // Удаляем все временные скрытые поля
    const hiddenInputs = form.querySelectorAll('.hidden-input')
    hiddenInputs.forEach(input => {
      input.remove()
    })

    // Очищаем информацию о добавленных полях
    delete modalElement.dataset.hiddenInputs
  }

  // Метод для получения текущего открытого модального окна
  getCurrentModal() {
    return document.querySelector('.modal.active')
  }

  // Метод для обновления данных в уже открытом модальном окне
  updateModalData(data = {}) {
    const currentModal = this.getCurrentModal()
    if (currentModal) {
      // Удаляем все старые поля
      this.removeAllHiddenInputs(currentModal)

      // Добавляем новые поля
      if (data.tariffName) {
        this.addHiddenInput(currentModal, 'tariff', data.tariffName)
      }
      if (data.stockName) {
        this.addHiddenInput(currentModal, 'stock', data.stockName)
      }
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  window.modalManager = new Modal()
})
