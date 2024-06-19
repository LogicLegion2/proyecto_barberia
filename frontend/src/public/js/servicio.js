function seleccionarServicio(id) {
    localStorage.setItem('servicioSeleccionado', id);
}
function redireccionarEditar() {
    const id = localStorage.getItem('servicioSeleccionado');
    if (id) {
        window.location.href = `http://localhost:3000/servicios/editar?id=${id}`;
    } else {
        alert('Seleccione un servicio primero');
    }
}

async function eliminarServicio() {
    const id = localStorage.getItem('servicioSeleccionado');
    if (id) {
        const respuesta = await fetch('http://localhost:3000/servicios/desactivar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        if (respuesta.ok) {
            Swal.fire({
                icon: 'success',
                title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Servicio eliminado exitosamente' + "</h5>",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                    content: 'text-alert'
                }
            });
            setTimeout(() => {
                window.location.reload();
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
    } else {
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Seleccione un producto primero' + "</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
    }
}