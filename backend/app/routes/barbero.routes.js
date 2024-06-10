
import { Router } from "express";
import { buscarBarbero, listarBarbero } from "../controllers/barbero.controllers.js";

const rutaBarberos = Router();

rutaBarberos.get("/", listarBarbero);
rutaBarberos.get("/buscar", buscarBarbero);


export default rutaBarberos;