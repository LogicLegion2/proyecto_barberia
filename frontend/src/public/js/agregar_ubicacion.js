document.getElementById("formAgregarUbicacion").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Captura los valores del formulario
    const titulo = document.getElementById("agregar_titulo").value;
    const ubicacion = document.getElementById("agregar_ubicacion").value;
    const descripcion = document.getElementById("agregar_descripcion").value;
    const foto = document.getElementById("agregar_imagen").value;
    // Crear un objeto FormData para manejar la subida del archivo
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("ubicacion", ubicacion);
    formData.append("descripcion", descripcion);
    formData.append("foto", foto);

    fetch("http://localhost:3000/ubicaciones/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            ubicacion: ubicacion,
            descripcion: descripcion,
            foto: foto
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error));
});
