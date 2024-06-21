import { config } from "dotenv";
config();

export const paginaPrincipalBarbero = (req, res) => {
    res.render("views.barbero.ejs")
};

export const perfilBarbero = (req, res) => {
    res.render("views.perfil_barbero_editar.ejs")
};