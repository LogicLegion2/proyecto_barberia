document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
        try {
            const response = await fetch(`/servicios/obtener/${id}`);
            const data = await response.json();
            document.getElementById('servicio_id').value = id;
            document.getElementById('tipoServicio').value = data.tipoServicio;
            document.getElementById('descripcion').value = data.descripcion;
            document.getElementById('precio').value = data.precio;

            // Valores en los placeholders
            document.getElementById('tipoServicio').setAttribute('placeholder', data.tipoServicio);
            document.getElementById('descripcion').setAttribute('placeholder', data.descripcion);
            document.getElementById('precio').setAttribute('placeholder', data.precio);
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
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Servicio editado exitosamente' + "</h5>",
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