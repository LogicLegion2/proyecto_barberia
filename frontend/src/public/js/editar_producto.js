document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('productoSeleccionado');

    if (id) {
        const urlLogic = sessionStorage.getItem("urlLogic") + `/productos/obtener/${id}`;

        try {
            const response = await fetch(urlLogic);
            const data = await response.json();
            document.getElementById('producto_id').value = id;
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('descripcion').value = data.descripcion;
            document.getElementById('precio').value = data.precio;

            // Valores en los placeholders
            document.getElementById('nombre').setAttribute('placeholder', data.nombre);
            document.getElementById('descripcion').setAttribute('placeholder', data.descripcion);
            document.getElementById('precio').setAttribute('placeholder', data.precio);
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }
    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            id: document.getElementById('producto_id').value,
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: document.getElementById('precio').value
        };

        try {
            const response = await fetch(sessionStorage.getItem("urlLogic") + '/productos/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Producto editado exitosamente' + "</h5>",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'bg-alert',
                        content: 'text-alert'
                    }
                });
                setTimeout(() => {
                    window.location.href = `/admin/producto`;
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
                title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Error al editar el producto' + "</h5>",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                }
            });
        }
    });
});