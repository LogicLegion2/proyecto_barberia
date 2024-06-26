document.getElementById("agregarOferta").addEventListener("click", async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener la URL de la oferta y productos desde sessionStorage

        const urlProductos = sessionStorage.getItem("urlLogic") + `/productos`;

        try {
            const [ responseProductos] = await Promise.all([
                fetch(urlProductos)
            ]);

            if ( responseProductos.ok) {
                const productosData = await responseProductos.json();


                const productosSelect1 = document.getElementById('producto1');
                const productosSelect2 = document.getElementById('producto2');

                productosData.productos.forEach(producto => {
                    const option1 = document.createElement('option');
                    option1.value = producto.idProducto;
                    option1.text = producto.producto;
                    if (producto.idProducto === ofertaData.producto1) {
                        option1.selected = true;
                    }
                    productosSelect1.appendChild(option1);

                    const option2 = document.createElement('option');
                    option2.value = producto.idProducto;
                    option2.text = producto.producto;
                    if (producto.idProducto === ofertaData.producto2) {
                        option2.selected = true;
                    }
                    productosSelect2.appendChild(option2);
                });
                   

            // Capturar valores del formulario
            const producto1 = document.getElementById("producto1").value;
            const producto2 = document.getElementById("producto2").value;
            const descripcion = document.getElementById("descripcion").value;
            const precio = document.getElementById("precio").value;
            const foto = document.getElementById("fotoOferta").value;

            // Objeto con los datos de la oferta a crear
            const datosOferta = {
                producto1: producto1,
                producto2: producto2,
                descripcion: descripcion,
                precio: precio,
                foto: foto
            };

            // Enviar datos al servidor para crear la oferta
            try {
                const response = await fetch('http://localhost:3000/ofertas/crear', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosOferta)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data) {
                    console.log("Oferta agregada:", data); // Mostrar respuesta del servidor en consola
                    // Puedes realizar acciones adicionales aquí, como recargar la página
                    // location.reload();
                } else {
                    console.error("Fetch error: Respuesta vacía o no válida");
                }
            } catch (error) {
                console.error("Fetch error:", error); // Manejo de errores si falla la petición fetch
            }
        }
    } catch (error) {
        console.error("Fetch error:", error); // Manejo de errores si falla alguna de las peticiones fetch inicialmente
    }
})



