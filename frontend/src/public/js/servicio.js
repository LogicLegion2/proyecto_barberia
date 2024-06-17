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