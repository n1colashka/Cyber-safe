document.addEventListener('DOMContentLoaded', () => {
    // import swiper from '../node_modules/swiper/bundle';
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
});