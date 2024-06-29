document.getElementById("formAgregarUbicacion").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const titulo = document.getElementById("agregar_titulo").value;
    const ubicacion = document.getElementById("agregar_ubicacion").value;
    const descripcion = document.getElementById("agregar_descripcion").value;
    const imagen = document.getElementById("agregar_imagen").value;

    // Validación básica: asegurarse de que los campos no estén vacíos
    if (!titulo || !ubicacion || !descripcion) {
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Por favor, complete todos los campos.</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
        return;
    }

    // Objeto con los datos de la ubicación
    const datosUbicacion = {
        titulo: titulo,
        ubicacion: ubicacion,
        descripcion: descripcion,
        imagenURL: imagen
    };

    // Enviar los datos al servidor usando fetch
    fetch("http://localhost:3000/ubicaciones/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUbicacion)
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Ubicación creada exitosamente.</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
        console.log("Ubicación creada:", data);
        // Aquí podrías agregar lógica adicional, como redireccionar o actualizar la página
    })
    .catch(error => {
        console.error("Error al crear ubicación:", error);
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Error al crear ubicación. Inténtelo nuevamente.</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
        // Aquí podrías manejar errores, como mostrar un mensaje de error al usuario
    });
});
