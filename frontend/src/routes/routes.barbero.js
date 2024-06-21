import { Router } from "express";
import { paginaPrincipalBarbero, perfilBarbero } from "../controllers/controllers.barbero.js";

const rutaBarbero = Router();

rutaBarbero.get("/home", paginaPrincipalBarbero);
rutaBarbero.get("/perfil", perfilBarbero);

export default rutaBarbero;