import { Router } from "express";
import { login, paginaPrincipalBarbero } from "../controllers/controllers.barberos.js";

const rutaBarbero = Router();

rutaBarbero.get("/login", login);
rutaBarbero.get("/home", paginaPrincipalBarbero);


export default rutaBarbero;