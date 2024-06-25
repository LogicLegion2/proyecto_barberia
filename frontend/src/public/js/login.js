const loguear = async () => {
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const url = document.getElementById("url").value;

    sessionStorage.setItem("urlLogic", url);
    const urlLogic = sessionStorage.getItem("urlLogic") + "/usuarios/login";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo: correo,
            contrasena: contrasena
        })
    };

    try {
        const response = await fetch(urlLogic, options);
        const data = await response.json();

        if (data.error) {
            Swal.fire({
                icon: 'warning',
                title: `<h5 style='color:white; font-family: "Aleo", serif;'>${data.message}</h5>`,
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                    content: 'text-alert'
                }
            });
        } else {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.id);
            sessionStorage.setItem("rol", data.rol);
            document.cookie = `id=${data.id}; path=/`;

            switch (data.rol) {
                case 'administrador':
                    window.location.href = "/admin/home";
                    break;
                case 'usuario':
                    window.location.href = "/cliente/home";
                    break;
                case 'barbero':
                    window.location.href = "/barbero/home";
                    break;
                default:
                    window.location.href = "/home/login";
            }
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: `<h5 style='color:white; font-family: "Aleo", serif;'>Error en la conexión</h5>`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
    }
};

const cerrarSesion = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        console.log("No hay token almacenado");
        return;
    }

    const urlLogout = sessionStorage.getItem("urlLogic") + "/usuarios/logout";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token  // Incluir el token en los headers
        }
    };

    try {
        const response = await fetch(urlLogout, options);
        const data = await response.json();

        if (response.status === 200) {
            // Limpiar datos de sesión
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("rol");
            document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Redireccionar al login
            window.location.href = "/home/login";
        } else {
            // Manejar errores
            console.error("Error al cerrar sesión:", data.message);
        }
    } catch (err) {
        console.error("Error de red:", err);
    }
};