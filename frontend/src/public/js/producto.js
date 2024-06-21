// Toma el id del producto para redireccionarlo a editar o eliinar
function seleccionarProducto(id) {
    localStorage.setItem('productoSeleccionado', id);
}

// Redirecciona el producto seleccionado al formulario para la edición
function redireccionarEditar() {
    // Recibe parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuario = urlParams.get('idUser');
    const token = urlParams.get('token');

    if (idUsuario && token) {
        localStorage.setItem('idUsuario', idUsuario);
        localStorage.setItem('token', token);
    }

    const storedIdUsuario = localStorage.getItem('idUsuario');
    const storedToken = localStorage.getItem('token');
    
    const id = localStorage.getItem('productoSeleccionado');

    if (id) {
        window.location.href = `http://localhost:3000/productos/editar?id=${id}&idUser=${storedIdUsuario}&token=${storedToken}`;
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        customClass: {
            popup: 'bg-alert',
            content: 'text-alert'
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            if (id) {
                const respuesta = await fetch('http://localhost:3000/productos/desactivar', {
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