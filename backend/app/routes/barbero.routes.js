
import { Router } from "express";
import { listarBarbero, verPerfil } from "../controllers/barbero.controllers.js";

const rutaBarberos = Router();

rutaBarberos.get("/listar", listarBarbero);
rutaBarberos.get("/ver/perfil", verPerfil);


export default rutaBarberos;