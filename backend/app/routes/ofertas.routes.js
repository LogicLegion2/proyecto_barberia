
import { Router } from "express";
<<<<<<< Updated upstream
import { listaroferta } from "../controllers/ofertas.controllers.js";
=======
import { buscarOferta, listarOferta } from "../controllers/ofertas.controllers.js";

>>>>>>> Stashed changes

const rutaofertas = Router();

<<<<<<< Updated upstream
rutaofertas.get("/", listaroferta);
=======
rutaOfertas.get("/", listarOferta);
rutaOfertas.get("/buscar", buscarOferta);
>>>>>>> Stashed changes


export default rutaofertas;