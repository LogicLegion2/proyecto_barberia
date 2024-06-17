function seleccionarProducto(id) {
    localStorage.setItem('productoSeleccionado', id);
}
function redireccionarEditar() {
    const id = localStorage.getItem('productoSeleccionado');
    if (id) {
        window.location.href = `http://localhost:3000/productos/editar?id=${id}`;
    } else {
        alert('Seleccione un producto primero');
    }
}