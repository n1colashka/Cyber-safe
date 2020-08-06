document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },

        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
        },

        scrollbar: {
            el: '.swiper-scrollbar',
        },

        effect: 'cube',

    });

    document.querySelector('.menu-btn').addEventListener('click', function() {
        document.querySelector('.menu').classList.toggle('active');
        this.classList.toggle('active');
    });

    document.querySelector('.menu').addEventListener('click', function(event) {
        if (event.target.classList.contains('menu__link')) this.classList.toggle('active');
    });
});