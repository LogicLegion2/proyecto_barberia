
import { Router } from "express";
<<<<<<< Updated upstream
import { listarubicacion } from "../controllers/ubicaciones.controllers.js";
=======
import { buscarUbicacion, listarUbicacion } from "../controllers/ubicaciones.controllers.js";
>>>>>>> Stashed changes


const rutaubicaciones = Router();

<<<<<<< Updated upstream
rutaubicaciones.get("/", listarubicacion);
=======
rutaUbicaciones.get("/", listarUbicacion);
rutaUbicaciones.get("/buscar", buscarUbicacion);
>>>>>>> Stashed changes


export default rutaubicaciones;