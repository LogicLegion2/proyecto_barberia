import { Router } from "express";
import { listarBarbero, buscar, listarBarberoAdmin, perfilBarbero, verCalendario, verPerfilBarbero, verPerfilBarberoAdmin } from "../controllers/barbero.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaBarberos = Router();

rutaBarberos.get("/listar", listarBarbero);
rutaBarberos.get("/listar/admin", listarBarberoAdmin);
rutaBarberos.get("/ver/perfil/:id", verCalendario);
rutaBarberos.get("/ver/barbero/:id", verPerfilBarbero);
rutaBarberos.get("/ver/admin/:id", verPerfilBarberoAdmin);
rutaBarberos.get("/perfil/:id", perfilBarbero);
rutaBarberos.get("/buscar", buscar);

export default rutaBarberos;