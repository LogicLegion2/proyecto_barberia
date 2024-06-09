
import { Router } from "express";
import { listarBarbero } from "../controllers/barbero.controllers.js";

const rutaBarberos = Router();

rutaBarberos.get("/", listarBarbero);


export default rutaBarberos;