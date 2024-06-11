
import { Router } from "express";
import { listarBarbero, buscarBarbero, verPerfil } from "../controllers/barbero.controllers.js";

const rutaBarberos = Router();

rutaBarberos.get("/listar", listarBarbero);
rutaBarberos.get("/ver/perfil", verPerfil);
rutaBarberos.get("/buscar", buscarBarbero);

export default rutaBarberos;