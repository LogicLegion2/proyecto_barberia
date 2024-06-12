import { Router } from "express";
import { login, paginaPrincipalAdmin, paginaPrincipalBarbero, paginaPrincipalCliente } from "../controllers/controllers.home.js";

const rutaHome = Router();

rutaHome.get("/login", login);
rutaHome.get("/cliente", paginaPrincipalCliente);
rutaHome.get("/admin", paginaPrincipalAdmin);
rutaHome.get("/barbero", paginaPrincipalBarbero);

export default rutaHome;