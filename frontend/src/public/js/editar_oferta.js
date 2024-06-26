document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('ofertaSeleccionada');
    console.log(id);
    if (id) {
        const urlOferta = sessionStorage.getItem("urlLogic") + `/ofertas/obtener/${id}`;
        const urlProductos = sessionStorage.getItem("urlLogic") + `/productos`;

        try {
            const [responseOferta, responseProductos] = await Promise.all([
                fetch(urlOferta),
                fetch(urlProductos)
            ]);

            if (responseOferta.ok && responseProductos.ok) {
                const ofertaData = await responseOferta.json();
                const productosData = await responseProductos.json();

                document.getElementById('oferta_id').value = id;
                document.getElementById('descripcion').value = ofertaData.descripcion || '';
                document.getElementById('precio').value = ofertaData.precio || '';

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

            } else {
                console.error('Error fetching data:', responseOferta.statusText || 'Error desconocido');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            id: document.getElementById('oferta_id').value,
            producto1: document.getElementById('producto1').value,
            producto2: document.getElementById('producto2').value,
            descripcion: document.getElementById('descripcion').value,
            precio: document.getElementById('precio').value
        };

        try {
            const response = await fetch(sessionStorage.getItem("urlLogic") + `/ofertas/editar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseData = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Oferta editada exitosamente' + "</h5>",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'bg-alert',
                        content: 'text-alert'
                    }
                });
                setTimeout(() => {
                    window.location.href = `/admin/oferta`;
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Inténtalo de nuevo más tarde' + "</h5>",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'bg-alert',
                    }
                });
            }
        } catch (error) {
            console.error('Error al editar la oferta:', error);
            Swal.fire({
                icon: 'error',
                title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Error al editar la oferta' + "</h5>",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                }
            });
        }
    });
});
