document.getElementById("agregarServicio").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const tipoServicio = document.getElementById("tiposervicio").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const fotoServicio = document.getElementById("fotoservicio").value;


    // Objeto con los datos del barbero
    const datosBarbero = {
        tipoServicio: tipoServicio,
        descripcion: descripcion,
        precio: precio,
        fotoServicio: fotoServicio
    };

    // Enviar los datos al servidor
    fetch('http://localhost:3000/servicios/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosBarbero)
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
            console.log("Servicio agregado:", data); // Muestra en consola la respuesta del servidor
            // location.reload(); // Recarga la página después de agregar el barbero (opcional)
        } else {
            console.error("Fetch error: Respuesta vacía o no válida");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error); // Manejo de errores si falla la petición fetch
    });
});
