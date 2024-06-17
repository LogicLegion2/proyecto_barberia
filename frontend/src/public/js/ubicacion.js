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