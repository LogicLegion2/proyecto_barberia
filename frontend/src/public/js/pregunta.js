function seleccionarPregunta(id) {
    localStorage.setItem('preguntaSeleccionada', id);
}
function redireccionarEditar() {
    const id = localStorage.getItem('preguntaSeleccionada');
    if (id) {
        window.location.href = `http://localhost:3000/preguntas/editar?id=${id}`;
    } else {
        alert('Seleccione un pregunta primero');
    }
}