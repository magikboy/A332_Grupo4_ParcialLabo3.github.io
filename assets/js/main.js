/* Manejar el movimiento del cursor */
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

    // Manejar la entrada y salida del cursor sobre los elementos de la galería
    $('.gallery_item>a, .gallery_award').on('mouseenter', function () {
        $('.cs_cursor_lg').addClass('opacity-0');
        $('.cs_cursor_sm').addClass('opacity-0');
    });
    $('.gallery_item>a, .gallery_award').on('mouseleave', function () {
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
        if (target.closest('.gallery_item .gallery_thumb')) {
            gsap.to(client_cursor, { opacity: 1, zoom: 1, ease: 'power2.out' });
        } else {
            gsap.to(client_cursor, { opacity: 0, ease: 'power2.out' });
        }
    } catch (err) {
        console.log(err);
    }
}

// Desplazamiento suave a las secciones al hacer clic en los enlaces del menú
$(document).ready(function(){
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1200);
            // Desmarca el checkbox para cerrar el menú
            $('#menu-checkbox').prop('checked', false);
        }
    });
});

$(document).ready(function() {
    var lastScrollTop = 0;
    var navbar = $('.navbar');
    
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        
        if (st > lastScrollTop) {
            // Scroll hacia abajo
            navbar.addClass('nav-hidden');
        } else {
            // Scroll hacia arriba
            navbar.removeClass('nav-hidden');
        }
        
        lastScrollTop = st;
    });
});

// Agregar el evento de movimiento del mouse
document.addEventListener('mousemove', cursorMovingAnimation);

// Validaciones del formulario de contacto
$(document).ready(function() {
    $('#form').on('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Validación de los campos del formulario
        let fromName = $('#from_name').val().trim();
        let message = $('#message').val().trim();
        let emailId = $('#email_id').val().trim();
        let valid = true;
        let alertMessage = '';

        if (fromName === '') {
            alertMessage += 'Por favor, ingresa tu nombre.<br>';
            valid = false;
        }

        if (message === '') {
            alertMessage += 'Por favor, ingresa tu consulta.<br>';
            valid = false;
        }

        if (emailId === '') {
            alertMessage += 'Por favor, ingresa tu correo electrónico.<br>';
            valid = false;
        } else if (!validateEmail(emailId)) {
            alertMessage += 'Por favor, ingresa un correo electrónico válido.<br>';
            valid = false;
        }

        if (!valid) {
            Swal.fire({
                icon: 'warning',
                title: 'Validación del Formulario',
                html: alertMessage,
                background: '#f8d7da',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Ok'
            });
            return;
        }

        // Si el formulario es válido, procede a enviar el email
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_9178r48';

        emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email';
            Swal.fire({
                html: `
                <div style="position: relative; padding: 20px; border-radius: 10px; text-align: center; overflow: hidden;">
                    <img src="assets/img/musicos/1.png" alt="Saxofonista 1" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); width: 70px; height: auto;">
                    <span style="color: white; margin: 0 10px;">Consulta Enviada!</span>
                    <img src="assets/img/musicos/2.png" alt="Saxofonista 2" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); width: 70px; height: auto;">
                </div>
                `,
                background: '#333',
                showConfirmButton: false,
                timer: 3000
            });
        }, (err) => {
            btn.value = 'Send Email';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar tu consulta.',
                footer: `<pre>${JSON.stringify(err, null, 2)}</pre>`
            });
        });
    });
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
