function seleccionarUbicacion(id) {
    localStorage.setItem('ubicacionSeleccionada', id);
}
function redireccionarEditar() {
    const id = localStorage.getItem('ubicacionSeleccionada');
    if (id) {
        window.location.href = `http://localhost:3000/ubicaciones/editar?id=${id}`;
    } else {
        alert('Seleccione una ubicación primero');
    }
}

async function eliminarUbicacion() {
    const id = localStorage.getItem('ubicacionSeleccionada');
    Swal.fire({
        title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + '¿Estás seguro de eliminarlo?' + "</h5>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#318331",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
            popup: 'bg-alert',
            content: 'text-alert'
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            if (id) {
                const respuesta = await fetch('http://localhost:3000/ubicaciones/desactivar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id })
                });

                if (respuesta.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Ubicación eliminada exitosamente' + "</h5>",
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
                    title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Seleccione una ubicación primero' + "</h5>",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'bg-alert',
                    }
                });
            }
        }
    });
}