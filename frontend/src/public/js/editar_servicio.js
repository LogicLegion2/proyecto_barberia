document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('servicioSeleccionado');

    if (id) {
        const urlLogic = sessionStorage.getItem("urlLogic") + `/servicios/obtener/${id}`;

        try {
            const response = await fetch(urlLogic);
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
    
    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            id: document.getElementById('servicio_id').value,
            tipoServicio: document.getElementById('tipoServicio').value,
            descripcion: document.getElementById('descripcion').value,
            precio: document.getElementById('precio').value
        };

        try {
            const response = await fetch(sessionStorage.getItem("urlLogic") + '/servicios/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response);
            if (response.ok) {
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
                setTimeout(() => {
                    window.location.href = `/admin/servicio`;
                }, 1500);
            } else {
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
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Error al editar el servicio' + "</h5>",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                }
            });
        }
    });
});