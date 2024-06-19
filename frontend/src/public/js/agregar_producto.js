document.getElementById("formAgregarProducto").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const foto = document.getElementById("foto").files[0];

    // Crear un objeto FormData para manejar la subida del archivo
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("foto", foto);

    // Enviar los datos al servidor
    try {
        const response = await fetch('http://localhost:3000/productos/agregarp', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Producto agregado:", data); // Muestra en consola la respuesta del servidor
        location.reload(); // Recarga la página después de agregar el producto (opcional)
    } catch (error) {
        console.error("Fetch error:", error); // Manejo de errores si falla la petición fetch
    }
});