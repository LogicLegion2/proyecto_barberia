document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
        try {
            const response = await fetch(`/ubicaciones/obtener/${id}`);
            const data = await response.json();
            document.getElementById('ubicacion_id').value = id;
            document.getElementById('titulo').value = data.titulo;
            document.getElementById('ubicacion').value = data.ubicacion;
            document.getElementById('descripcion').value = data.descripcion;

            // Valores en los placeholders
            document.getElementById('titulo').setAttribute('placeholder', data.titulo);
            document.getElementById('ubicacion').setAttribute('placeholder', data.ubicacion);
            document.getElementById('descripcion').setAttribute('placeholder', data.descripcion);
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
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Ubicación editada exitosamente' + "</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
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