document.getElementById("registrarBarbero").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const descripcion = document.getElementById("descripcion").value;
    const fotoPerfil = document.getElementById("fotoPerfil").value;
      // Verifica si todos los campos están llenos
      if (!nombre || !telefono || !correo || !contrasena || !descripcion || !fotoPerfil) {
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

    // Objeto con los datos del barbero
    const datosBarbero = {
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
        telefono: telefono,
        descripcion: descripcion,
        fotoPerfil: fotoPerfil
    };

    // Enviar los datos al servidor
    fetch('http://localhost:3000/usuarios/barbero', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosBarbero)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log("Barbero agregado:", data);
        // Mostrar alerta de éxito
        Swal.fire({
            icon: 'success',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Usuario registrado exitosamente</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
        // Redireccionar después de un tiempo
        // setTimeout(() => {
        //     window.location.href = 'http://localhost:3800/cliente/barbero'; // Cambia por la ruta deseada
        // }, 1500);
    })
    .catch(error => {
        console.error("Fetch error:", error.message);
        // Mostrar alerta de error
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Error al registrar usuario</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
            }
        });
    });
});
