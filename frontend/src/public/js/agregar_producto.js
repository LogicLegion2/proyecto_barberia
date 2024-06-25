document.getElementById("formAgregarProducto").addEventListener("click", (e) => {
    e.preventDefault(); 

    // Captura los valores del formulario
    const nombre = document.getElementById("agregar_nombre").value;
    const descripcion = document.getElementById("agregar_descripcion").value;
    const precio = document.getElementById("agregar_precio").value;
    const cantidad = document.getElementById("agregar_cantidad").value;
    const foto = document.getElementById("agregar_imagen").value;
    // Crea un objeto FormData para manejar la subida del archivo
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("cantidad", cantidad);
    formData.append("foto", foto);

    fetch("http://localhost:3000/productos/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            cantidad: cantidad,
            foto: foto
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error));
});
