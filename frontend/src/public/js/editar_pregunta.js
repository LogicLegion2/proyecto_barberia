document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('preguntaSeleccionada');

    if (id) {
        const urlLogic = sessionStorage.getItem("urlLogic") + `/preguntas/obtener/${id}`;

        try {
            const response = await fetch(urlLogic);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('pregunta_id').value = id;
                document.getElementById('pregunta').value = data.pregunta;
                document.getElementById('respuesta').value = data.respuesta;

                // Valores en los placeholders
                document.getElementById('pregunta').setAttribute('placeholder', data.pregunta);
                document.getElementById('respuesta').setAttribute('placeholder', data.respuesta);
            } else {
                console.error('Error fetching question data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching question data:', error);
        }
    }

    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            id: document.getElementById('pregunta_id').value,
            pregunta: document.getElementById('pregunta').value,
            resp: document.getElementById('respuesta').value
        };

        try {
            const response = await fetch(sessionStorage.getItem("urlLogic") + '/preguntas/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Pregunta editada exitosamente' + "</h5>",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'bg-alert',
                        content: 'text-alert'
                    }
                });
                setTimeout(() => {
                    window.location.href = `/admin/pregunta`;
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Inténtelo de nuevo más tarde' + "</h5>",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'bg-alert',
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "<h5 style='color:white; font-family: 'Aleo', serif;'>" + 'Error al editar la pregunta' + "</h5>",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'bg-alert',
                }
            });
        }
    });
});
