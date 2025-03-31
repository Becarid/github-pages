document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !mobileMenuBtn.contains(e.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    }

    // Обработка адаптивности при изменении размера окна
    window.addEventListener('resize', handleResize);

    function handleResize() {
        if (window.innerWidth <= 768) {
            // Логика для мобильной версии
        } else {
            // Логика для десктопной версии
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        }
    }

    // Вызовем функцию один раз при загрузке
    handleResize();

    // Обработка формы подписки
    const emailForm = document.querySelector('.email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // Здесь будет код для отправки данных на сервер
                alert(`Спасибо за подписку! Мы отправили первый урок на ${email}`);
                emailInput.value = '';
            }
        });
    }

    // Навигация стрелками и скроллом
    const scrollDownBtn = document.querySelector('.scroll-down');
    const upArrow = document.querySelector('.arrow-control.up');
    const downArrow = document.querySelector('.arrow-control.down');

    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    if (upArrow) {
        upArrow.addEventListener('click', () => {
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    if (downArrow) {
        downArrow.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Инициализация Bootstrap карусели для отзывов
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true,
            touch: true,
            pause: 'hover'
        });

        // Настраиваем управление стрелками
        const prevArrow = document.querySelector('.testimonial-arrow.prev');
        const nextArrow = document.querySelector('.testimonial-arrow.next');

        if (prevArrow) {
            prevArrow.addEventListener('click', (e) => {
                e.preventDefault();
                carousel.prev();
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', (e) => {
                e.preventDefault();
                carousel.next();
            });
        }

        // Обработка события перед перелистыванием слайдов
        testimonialCarousel.addEventListener('slide.bs.carousel', function (e) {
            const activeItem = testimonialCarousel.querySelector('.carousel-item.active');
            const nextItem = e.relatedTarget;

            // Определяем направление
            const direction = e.direction === 'left' ? 'next' : 'prev';

            if (direction === 'next') {
                nextItem.classList.add('carousel-item-next');
                setTimeout(() => {
                    nextItem.classList.add('carousel-item-start');
                    activeItem.classList.add('carousel-item-start');
                }, 20);
            } else {
                nextItem.classList.add('carousel-item-prev');
                setTimeout(() => {
                    nextItem.classList.add('carousel-item-end');
                    activeItem.classList.add('carousel-item-end');
                }, 20);
            }
        });

        // Обработка события после перелистывания слайдов
        testimonialCarousel.addEventListener('slid.bs.carousel', function (e) {
            // Удаляем все промежуточные классы
            const items = testimonialCarousel.querySelectorAll('.carousel-item');
            items.forEach(item => {
                item.classList.remove('carousel-item-start', 'carousel-item-end', 'carousel-item-next', 'carousel-item-prev');
            });

            // Убедимся, что все слайды правильно позиционированы
            setTimeout(() => {
                equalizeCardHeights();
            }, 50);
        });

        // Выравнивание высоты карточек
        function equalizeCardHeights() {
            const slides = document.querySelectorAll('.carousel-item');
            slides.forEach(slide => {
                const cards = slide.querySelectorAll('.testimonial-card');
                let maxHeight = 0;

                // Сбрасываем высоту перед измерением
                cards.forEach(card => {
                    card.style.height = 'auto';
                });

                // Находим максимальную высоту
                cards.forEach(card => {
                    const cardHeight = card.offsetHeight;
                    maxHeight = Math.max(maxHeight, cardHeight);
                });

                // Устанавливаем одинаковую высоту
                cards.forEach(card => {
                    card.style.height = `${maxHeight}px`;
                });
            });
        }

        // Вызываем функцию после загрузки и при изменении размера окна
        window.addEventListener('load', equalizeCardHeights);
        window.addEventListener('resize', equalizeCardHeights);
    }
});
