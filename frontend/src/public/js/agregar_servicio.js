document.getElementById("crearServicio").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const tipoServicio = document.getElementById("tiposervicio").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const fotoServicio = document.getElementById("formFile").files[0]; // Captura el archivo seleccionado

    // Verifica si todos los campos están llenos
    if (!tipoServicio || !descripcion || !precio) {
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

    // Crear un objeto FormData para enviar datos binarios
    const formData = new FormData();
    formData.append("tipoServicio", tipoServicio);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("fotoServicio", fotoServicio);

    try {
        // Enviar los datos al servidor
        const response = await fetch('http://localhost:3000/servicios/crear', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Servicio agregado:", data);

        Swal.fire({
            icon: 'success',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Servicio agregado exitosamente</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });

        // Opcional: Recargar la página después de agregar el servicio
        setTimeout(() => {
            location.reload();
        }, 1500);
    } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Error al agregar servicio</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
    }
});
