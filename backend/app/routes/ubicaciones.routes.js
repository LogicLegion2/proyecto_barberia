
import { Router } from "express";
import { listarUbicacion } from "../controllers/ubicaciones.controllers.js";


const rutaUbicaciones = Router();

rutaUbicaciones.get("/", listarUbicacion);


export default rutaUbicaciones;