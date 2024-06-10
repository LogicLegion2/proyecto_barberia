
import { Router } from "express";
<<<<<<< Updated upstream
import { listarservicio } from "../controllers/servicios.controllers.js";
=======
import { buscarServicio, listarServicio} from "../controllers/servicios.controllers.js";
>>>>>>> Stashed changes

const rutaservicios = Router();

<<<<<<< Updated upstream
rutaservicios.get("/", listarservicio);
=======
rutaServicios.get("/", listarServicio);
rutaServicios.get("/buscar", buscarServicio);
>>>>>>> Stashed changes


export default rutaservicios;