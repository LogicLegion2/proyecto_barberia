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
            document.cookie = `id=${data.id}; path=/`;
            window.location.href = "/cliente/home";
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
