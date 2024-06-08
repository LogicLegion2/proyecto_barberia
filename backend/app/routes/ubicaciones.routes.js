
import { Router } from "express";
import { listarubicacion } from "../controllers/ubicaciones.controllers.js";


const rutaubicaciones = Router();

rutaubicaciones.get("/", listarubicacion);


export default rutaubicaciones;