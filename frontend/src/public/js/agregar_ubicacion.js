document.getElementById("agregarUbicacion").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const archivo = document.getElementById("archivo").files[0];

    // Crear un objeto FormData para enviar los datos, incluyendo el archivo
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("direccion", direccion);
    formData.append("archivo", archivo);

    // Enviar los datos al servidor
    fetch('http://localhost:3000/ubicaciones/crearu', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parsea la respuesta a JSON
    })
    .then(data => {
        // Verifica si la respuesta está vacía antes de intentar analizarla como JSON
        if (data) {
            console.log("Ubicación agregada:", data); // Muestra en consola la respuesta del servidor
            location.reload(); // Recarga la página después de agregar la ubicación (opcional)
        } else {
            console.error("Fetch error: Respuesta vacía o no válida");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error); // Manejo de errores si falla la petición fetch
    });
});
