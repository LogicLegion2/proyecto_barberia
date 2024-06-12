import { config } from "dotenv";
config();

export const login = (req, res) => {
    res.render("views.iniciar_sesion.ejs")
};

export const paginaPrincipalAdmin = (req, res) => {
    res.render("views.pad_admin.ejs")
};