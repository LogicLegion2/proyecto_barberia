function seleccionarUbicacion(id) {
    localStorage.setItem('ubicacionSeleccionada', id);
}

function redireccionarEditar() {
    const id = localStorage.getItem('ubicacionSeleccionada');
    if (id) {
        window.location.href = `/admin/ubicacion/editar?id=${id}`;
    } else {
        Swal.fire({
            icon: 'warning',
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Seleccione una ubicación primero' + "</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
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
            const urlLogic = sessionStorage.getItem("urlLogic") + "/ubicaciones/desactivar";
            if (id) {
                const respuesta = await fetch(urlLogic, {
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