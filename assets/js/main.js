// Agregar cursores al body
$(function () {
    $('body').append('<span class="cs_cursor_lg"></span>');
    $('body').append('<span class="cs_cursor_sm"></span>');

    // Manejar la entrada y salida del cursor sobre enlaces y elementos interactivos
    $('a, .cs_swiper_next, .cs_swiper_prev').on('mouseenter', function () {
        $('.cs_cursor_lg').addClass('cs_large');
        $('.cs_cursor_sm').addClass('cs_large');
    });
    $('a, .cs_swiper_next, .cs_swiper_prev').on('mouseleave', function () {
        $('.cs_cursor_lg').removeClass('cs_large');
        $('.cs_cursor_sm').removeClass('cs_large');
    });

    // Manejar la entrada y salida del cursor sobre los elementos de portfolio
    $('.cs_portfolio.cs_style_1>a, .cs_awaard.cs_style_1').on('mouseenter', function () {
        $('.cs_cursor_lg').addClass('opacity-0');
        $('.cs_cursor_sm').addClass('opacity-0');
    });
    $('.cs_portfolio.cs_style_1>a, .cs_awaard.cs_style_1').on('mouseleave', function () {
        $('.cs_cursor_lg').removeClass('opacity-0');
        $('.cs_cursor_sm').removeClass('opacity-0');
    });
});

// Función para mover el cursor
function cursorMovingAnimation(event) {
    try {
        const x = event.clientX;
        const y = event.clientY;

        gsap.to('.cs_cursor_lg', { x, y, ease: 'power2.out' });
        gsap.to('.cs_cursor_sm', { x, y, ease: 'power2.out' });

        const target = event.target;
        var client_cursor = document.getElementById('client_cursor');
        if (target.closest('.cs_portfolio.cs_style_1 .cs_portfolio_thumb')) {
            gsap.to(client_cursor, { opacity: 1, zoom: 1, ease: 'power2.out' });
        } else {
            gsap.to(client_cursor, { opacity: 0, ease: 'power2.out' });
        }
    } catch (err) {
        console.log(err);
    }
}

// Agregar el evento de movimiento del mouse
document.addEventListener('mousemove', cursorMovingAnimation);
