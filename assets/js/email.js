const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function(event) {
    event.preventDefault();

    let fromName = document.getElementById('from_name').value;
    let message = document.getElementById('message').value;
    let emailId = document.getElementById('email_id').value;
    let valid = true;
    let alertMessage = '';

    // Validación del nombre
    if (fromName.trim() === '') {
        alertMessage += 'Por favor, ingresa tu nombre.<br>';
        valid = false;
    }
    
    // Validación del mensaje
    if (message.trim() === '') {
        alertMessage += 'Por favor, ingresa tu consulta.<br>';
        valid = false;
    }
    
    // Validación del correo electrónico
    if (emailId.trim() === '') {
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

    if (valid) {
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
    }
  });

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
