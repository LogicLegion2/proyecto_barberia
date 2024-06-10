
import { Router } from "express";
<<<<<<< Updated upstream
import { listarbarbero } from "../controllers/barbero.controllers.js";
=======
import { buscarBarbero, listarBarbero } from "../controllers/barbero.controllers.js";
>>>>>>> Stashed changes

const rutabarberos = Router();

<<<<<<< Updated upstream
rutabarberos.get("/", listarbarbero);
=======
rutaBarberos.get("/", listarBarbero);
rutaBarberos.get("/buscar", buscarBarbero);
>>>>>>> Stashed changes


export default rutabarberos;