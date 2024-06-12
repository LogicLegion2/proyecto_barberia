import { Router } from "express";
import { listarBarbero, buscarBarbero, verPerfil } from "../controllers/barbero.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaBarberos = Router();

rutaBarberos.get("/listar", verificarToken, listarBarbero);
rutaBarberos.get("/ver/perfil", verificarToken, verPerfil);
rutaBarberos.get("/buscar", verificarToken, buscarBarbero);

export default rutaBarberos;