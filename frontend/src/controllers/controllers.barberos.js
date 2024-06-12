import { config } from "dotenv";
config();

export const login = (req, res) => {
    res.render("views.iniciar_sesion.ejs")
};

export const paginaPrincipalBarbero = (req, res) => {
    res.render("views.pag_barbero.ejs")
};