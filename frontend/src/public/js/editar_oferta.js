document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('ofertaSeleccionada');

    if (id) {
        const urlLogic = sessionStorage.getItem("urlLogic") + `/ofertas/obtener/${id}`;

        try {
            const response = await fetch(urlLogic);
            const data = await response.json();
            console.log(data);
            document.getElementById('oferta_id').value = id;
            document.getElementById('producto1').value = data.producto1;
            document.getElementById('producto2').value = data.producto2;
            document.getElementById('descripcion').value = data.descripcion;
            document.getElementById('precio').value = data.precio;

            // Valores en los placeholders
            document.getElementById('producto1').setAttribute('placeholder', data.producto1);
            document.getElementById('producto2').setAttribute('placeholder', data.producto2);
            document.getElementById('descripcion').setAttribute('placeholder', data.descripcion);
            document.getElementById('precio').setAttribute('placeholder', data.precio);
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }
    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            id: document.getElementById('oferta_id').value,
            producto1: document.getElementById('producto1').value,
            producto2: document.getElementById('producto2').value,
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
                    title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Oferta editada exitosamente' + "</h5>",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'bg-alert',
                        content: 'text-alert'
                    }
                });
                setTimeout(() => {
                    window.location.href = `/admin/oferta`;
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
                title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Error al editar la oferta' + "</h5>",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                }
            });
        }
    });
});