const listarBarbero = async (req, res) => {
    const url = sessionStorage.getItem("urlLogic");
    const token = sessionStorage.getItem("token")
    const endpoint = "/barberos";
    const recurso = url + endpoint;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    };

    try {
        const response = await fetch(recurso, options);
        const data = await response.json();

        if (response.ok) {
            res.status(200).json({
                barberos: data.barberos,
                servicios: data.servicios,
                productos: data.productos,
                ofertas: data.ofertas,
                ubicaciones: data.ubicaciones,
                preguntas: data.preguntas
            });
        } else {
            res.status(500).json({ error: data.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
