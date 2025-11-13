// Компоненты и интерактивные элементы

// Accordion
class Accordion {
    constructor(element) {
        this.element = element;
        this.items = element.querySelectorAll('.accordion__item');
        this.init();
    }
    
    init() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion__header');
            header.addEventListener('click', () => this.toggle(item));
        });
    }
    
    toggle(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.items.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Tabs
class Tabs {
    constructor(element) {
        this.element = element;
        this.buttons = element.querySelectorAll('.tabs__button');
        this.contents = element.querySelectorAll('.tabs__content');
        this.init();
    }
    
    init() {
        this.buttons.forEach((button, index) => {
            button.addEventListener('click', () => this.switchTab(index));
        });
    }
    
    switchTab(index) {
        // Remove active class from all
        this.buttons.forEach(btn => btn.classList.remove('active'));
        this.contents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected
        this.buttons[index].classList.add('active');
        this.contents[index].classList.add('active');
    }
}

// Slider
class Slider {
    constructor(element) {
        this.element = element;
        this.slides = element.querySelectorAll('.slider__slide');
        this.prevBtn = element.querySelector('.slider__prev');
        this.nextBtn = element.querySelector('.slider__next');
        this.currentSlide = 0;
        this.init();
    }
    
    init() {
        this.showSlide(this.currentSlide);
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
    }
    
    next() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize accordions
    document.querySelectorAll('.accordion').forEach(el => new Accordion(el));
    
    // Initialize tabs
    document.querySelectorAll('.tabs').forEach(el => new Tabs(el));
    
    // Initialize sliders
    document.querySelectorAll('.slider').forEach(el => new Slider(el));
});
