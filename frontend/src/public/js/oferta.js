function seleccionarOferta(id) {
    localStorage.setItem('ofertaSeleccionada', id);
}
function redireccionarEditar() {
    const id = localStorage.getItem('ofertaSeleccionada');
    if (id) {
        window.location.href = `http://localhost:3000/ofertas/editar?id=${id}`;
    } else {
        alert('Seleccione una oferta primero');
    }
}

async function eliminarOferta() {
    const id = localStorage.getItem('ofertaSeleccionada');
    if (id) {
        const respuesta = await fetch('http://localhost:3000/ofertas/desactivar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        if (respuesta.ok) {
            Swal.fire({
                icon: 'success',
                title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Oferta eliminada exitosamente' + "</h5>",
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
            title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Seleccione una oferta primero' + "</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
    }
}