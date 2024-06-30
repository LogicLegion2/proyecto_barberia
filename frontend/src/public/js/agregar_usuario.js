document.getElementById("registrarUsuario").addEventListener("click", async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;

    // Validación básica: asegurarse de que los campos no estén vacíos
    if (!nombre || !telefono || !correo || !password || !rol) {
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Todos los campos son obligatorios</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
        return;
    }

    // Objeto con los datos del usuario
    const datosUsuario = {
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        password: password,
        rol: rol
    };

    // Enviar los datos al servidor
    try {
        const response = await fetch('http://localhost:3000/usuarios/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parsea la respuesta a JSON
        if (data) {
            console.log("Usuario registrado:", data); // Muestra en consola la respuesta del servidor
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
            // Aquí podrías agregar lógica adicional, como redireccionar a otra página
            // window.location.href = '/dashboard';
        } else {
            console.error("Fetch error: Respuesta vacía o no válida");
            Swal.fire({
                icon: 'error',
                title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Error al registrar usuario</h5>",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                    content: 'text-alert'
                }
            });
        }
    } catch (error) {
        console.error("Fetch error:", error); // Manejo de errores si falla la petición fetch
        Swal.fire({
            icon: 'error',
            title: "<h5 style='color:white; font-family: \"Aleo\", serif;'>Error al registrar usuario</h5>",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
    }
});
