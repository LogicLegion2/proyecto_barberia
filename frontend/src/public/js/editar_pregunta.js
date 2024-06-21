document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
        try {
            const response = await fetch(`/preguntas/obtener/${id}`);
            const data = await response.json();
            document.getElementById('pregunta_id').value = id;
            document.getElementById('pregunta').value = data.pregunta;
            document.getElementById('respuesta').value = data.respuesta;

            // Valores en los placeholders
            document.getElementById('pregunta').setAttribute('placeholder', data.pregunta);
            document.getElementById('respuesta').setAttribute('placeholder', data.respuesta);
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }

    // Alertas si la edición fue exitosa o hubo algún error
    const success = params.get('success');
    const error = params.get('error');
    if (success === 'true') {
        Swal.fire({
            icon: 'success',
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Pregunta editada exitosamente' + "</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
        setTimeout(() => {
            window.location.href = '/preguntas/listar';
        }, 1500);
    }
    if (error == 'true') {
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Intentalo de nuevo más tarde' + "</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
    }
});