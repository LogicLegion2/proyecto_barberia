document.getElementById("formAgregarProducto").addEventListener("click", (e) => {
    e.preventDefault(); 

    // Captura los valores del formulario
    const nombre = document.getElementById("agregar_nombre").value;
    const descripcion = document.getElementById("agregar_descripcion").value;
    const precio = document.getElementById("agregar_precio").value;
    const cantidad = document.getElementById("agregar_cantidad").value;
    const foto = document.getElementById("agregar_imagen").value;
      // Verifica si todos los campos están llenos
      if (!nombre || !descripcion || !precio || !cantidad) {
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
