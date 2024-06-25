import { config } from "dotenv";
config();

const url = process.env.BACKEND_URL

export const paginaPrincipalBarbero = async (req, res) => {
    const id = req.cookies.id;

    try {
        const recurso = url + `/barberos/calendario/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.pag_barbero.ejs", {
            barberos: data.barberos,
            reservas: data.reservas,
            url:url
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const perfilBarbero = async (req, res) => {
    const id = req.cookies.id;
    try {
        const recurso = url + `/barberos/perfil/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();

        res.render("views.perfil_barbero_editar.ejs", {
            barberos: data.barberos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};