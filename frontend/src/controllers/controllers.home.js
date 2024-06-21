import { config } from "dotenv";
config();

export const login = (req, res) => {
    res.render("views.iniciar_sesion.ejs")
};

export const registro = (req, res) => {
    res.render("views.registrarse.ejs")
};