const loguear = async() =>{
    
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const url = document.getElementById("url").value;

    sessionStorage.setItem("urlLogic", url);
    const urlLogic = sessionStorage.getItem("urlLogic") + "/usuarios/login";
    const options = {
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "correo": correo,
            "contrasena": contrasena
        })
    }

    await fetch(urlLogic, options)
    .then(res => res.json())
    .then(data =>{
        if(data.error == true){
            alertify.error('Clave errada');
        }else{
            //BOTON PARA INGRESAR CON EL TOKEN VERIFICADO:
            sessionStorage.setItem("token", data.body.token);
            window.location.href="/cliente/home";
            console.log(data);
        }
    })
    .catch(err=>{
        console.log("Tenemos un problema", err);
    })
}