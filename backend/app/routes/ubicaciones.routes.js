
import { Router } from "express";
import { listarUbicacion } from "../controllers/ubicaciones.controllers.js";


const rutaubicaciones = Router();

rutaubicaciones.get("/", listarUbicacion);


export default rutaubicaciones;