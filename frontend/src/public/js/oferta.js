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