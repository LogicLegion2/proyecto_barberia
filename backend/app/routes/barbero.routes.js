
import { Router } from "express";
import { buscarBarbero, listarBarbero, verPerfil } from "../controllers/barbero.controllers.js";

const rutaBarberos = Router();

rutaBarberos.get("/", listarBarbero);
rutaBarberos.get("/buscar", buscarBarbero);
rutaBarberos.get("/ver/perfil", verPerfil);


export default rutaBarberos;