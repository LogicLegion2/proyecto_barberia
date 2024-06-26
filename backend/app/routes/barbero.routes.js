import { Router } from "express";
import { listarBarbero, buscar, listarBarberoAdmin, perfilBarbero, verCalendario, verPerfilBarbero, verPerfilBarberoAdmin } from "../controllers/barbero.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaBarberos = Router();

rutaBarberos.get("/", listarBarbero);
rutaBarberos.get("/admin", listarBarberoAdmin);
rutaBarberos.get("/calendario/:id", verCalendario);
rutaBarberos.get("/barbero/:id", verPerfilBarbero);
rutaBarberos.get("/admin/:id", verPerfilBarberoAdmin);
rutaBarberos.get("/perfil/:id", perfilBarbero);
rutaBarberos.get("/buscar", buscar);

export default rutaBarberos; 