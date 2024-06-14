import { Router } from "express";
import { listarBarbero, buscarBarbero, listarBarberoAdmin, perfilBarbero, verCalendario, verPerfilBarbero } from "../controllers/barbero.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaBarberos = Router();

rutaBarberos.get("/listar", listarBarbero);
rutaBarberos.get("/listar/admin", listarBarberoAdmin);
rutaBarberos.get("/ver/perfil/:id", verCalendario);
rutaBarberos.get("/ver/barbero/:id", verPerfilBarbero);
rutaBarberos.get("/perfil/:id", perfilBarbero);
rutaBarberos.get("/buscar", verificarToken, buscarBarbero);

export default rutaBarberos;