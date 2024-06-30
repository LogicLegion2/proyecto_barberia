document.getElementById("formPregunta").addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const pregunta = document.getElementById("pregunta").value;
    const respuesta = document.getElementById("respuesta").value;

    // Verifica si todos los campos están llenos
    if (!pregunta || !respuesta) {
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Todos los campos son obligatorios</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
        return; // Sale de la función si hay algún campo vacío
    }

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
        console.log("Pregunta agregada:", data); // Muestra en consola la respuesta del servidor
        Swal.fire({
            icon: 'success',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Pregunta agregada exitosamente</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
        // Recargar la página después de agregar la pregunta (opcional)
        setTimeout(() => {
            location.reload();
        }, 1500);
    })
    .catch(error => {
        console.error("Fetch error:", error);
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Error al agregar pregunta</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
    });
});
