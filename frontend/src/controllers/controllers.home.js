import { config } from "dotenv";
config();

export const login = (req, res) => {
    const url = process.env.BACKEND_URL;
    const options ={
        url: url
    };
    res.render("views.iniciar_sesion.ejs",options)
};

export const registro = (req, res) => {
    res.render("views.registrarse.ejs")
};

export const contrasena = (req, res) => {
    res.render("views.reinstaurar_contrasena.ejs")
};