// Toma el id del producto para redireccionarlo a editar o eliinar
function seleccionarProducto(id) {
    localStorage.setItem('productoSeleccionado', id);
}

// Redirecciona el producto seleccionado al formulario para la edición
function redireccionarEditar() {
    const id = localStorage.getItem('productoSeleccionado');
    if (id) {
        window.location.href = `/admin/producto/editar?id=${id}`;
    } else {
        Swal.fire({
            icon: 'warning',
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Seleccione un producto primero' + "</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
    }
}

// Redirecciona el producto seleccionado para su eliminación
async function eliminarProducto() {
    const id = localStorage.getItem('productoSeleccionado');
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
            const urlLogic = sessionStorage.getItem("urlLogic") + "/productos/desactivar";
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
                        title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Producto eliminado exitosamente' + "</h5>",
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
    });
}