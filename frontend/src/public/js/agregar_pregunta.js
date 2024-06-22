document.getElementById("crearPregunta").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const pregunta = document.getElementById("pregunta").value;
    const respuesta = document.getElementById("respuesta").value;

    // Objeto con los datos de la pregunta
    const datosPregunta = {
        pregunta: pregunta,
        respuesta: respuesta
    };

    // Enviar los datos al servidor
    fetch('http://localhost:3000/preguntas/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosPregunta)
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
            console.log("Pregunta agregada:", data); // Muestra en consola la respuesta del servidor
            location.reload(); // Recarga la página después de agregar la pregunta (opcional)
        } else {
            console.error("Fetch error: Respuesta vacía o no válida");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error); // Manejo de errores si falla la petición fetch
    });
});
