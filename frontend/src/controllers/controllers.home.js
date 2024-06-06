import { config } from "dotenv";
config();

// export const home = (req, res) => {
//     // res.send("home");
//     res.render("views.home.ejs");
// };
export const login = (req, res) => {
    res.render("views.iniciar_sesion.ejs")
};

export const paginaPrincipal = (req, res) => {
    res.render("views.barbero.ejs")
};