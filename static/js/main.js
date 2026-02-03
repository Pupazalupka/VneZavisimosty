document.addEventListener('DOMContentLoaded', function() {
  const elementsToAnimate = [
    '.preview',
    '.about-preview',
    '.about-content',
    '.price',
    '.founder',
    '.contact',
    '.about-list-item',
    '.price-list-item',
    '.price-list-two-item'
  ];
  
  // Функция для проверки, виден ли элемент
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }
  
  // Функция для активации анимации
  function activateAnimations() {
    elementsToAnimate.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
          element.classList.add('animated');
        }
      });
    });
  }
  
  // Запускаем сразу при загрузке
  activateAnimations();
  
  // И при скролле
  window.addEventListener('scroll', activateAnimations);
  
  // Активируем все элементы с задержкой для плавности
  setTimeout(() => {
    document.querySelectorAll('.preview, .about-preview, .about-content, .price, .founder, .contact').forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('animated');
      }
    });
  }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем высоту навбара
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 160;
    
    // Функция для плавного скролла
    function smoothScrollTo(targetId, e = null) {
        if(e) e.preventDefault();
        
        let targetElement;
        let targetPosition;
        
        // Если это главная страница или ссылка наверх
        if(!targetId || targetId === '#' || targetId === '#main') {
            // Скроллим на самый верх
            targetPosition = 0;
        } else {
            // Ищем элемент по ID
            targetElement = document.querySelector(targetId);
            if(!targetElement) return; // Если элемент не найден
            
            // Рассчитываем позицию с учетом навбара
            const elementRect = targetElement.getBoundingClientRect();
            targetPosition = elementRect.top + window.pageYOffset - navbarHeight;
            
            // Минимальная позиция - чтобы не уехало под навбар
            if(targetPosition < navbarHeight) {
                targetPosition = navbarHeight + 20;
            }
        }
        
        // Плавный скролл
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Обновляем URL в адресной строке (опционально)
        if(targetId && targetId !== '#') {
            history.pushState(null, null, targetId);
        }
    }
    
    // Обработчик для навигационных ссылок
    document.querySelectorAll('.site-navigation-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, что это якорная ссылка на этой странице
            if(href && href.startsWith('#')) {
                smoothScrollTo(href, e);
            }
            // Внешние ссылки (если есть) работают как обычно
        });
    });
    
    // Также можно добавить для логотипа, если нужно
    const logo = document.querySelector('.logo');
    if(logo && logo.parentElement.tagName === 'A') {
        logo.parentElement.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href.startsWith('#')) {
                smoothScrollTo(href, e);
            }
        });
    }
    
    // Дополнительно: для кнопки "Записаться" в превью (если нужно на контакты)
    const previewButton = document.querySelector('.preview-content a');
    if(previewButton && previewButton.getAttribute('href').includes('t.me')) {
        // Это внешняя ссылка на Telegram, оставляем как есть
    } else if(previewButton) {
        // Если это внутренняя ссылка
        previewButton.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href.startsWith('#')) {
                smoothScrollTo(href, e);
            }
        });
    }
});