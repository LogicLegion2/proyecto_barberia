import { Router } from "express";
import { login, paginaEntregasAdmin, paginaPrincipalAdmin, paginaPrincipalBarbero, paginaPrincipalCliente } from "../controllers/controllers.home.js";

const rutaHome = Router();

rutaHome.get("/login", login);
rutaHome.get("/cliente", paginaPrincipalCliente);
rutaHome.get("/admin", paginaPrincipalAdmin);
rutaHome.get("/barbero", paginaPrincipalBarbero);
rutaHome.get("/entregas/admin", paginaEntregasAdmin);

export default rutaHome;