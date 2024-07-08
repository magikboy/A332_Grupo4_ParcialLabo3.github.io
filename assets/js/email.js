const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function(event) {
    event.preventDefault();

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
