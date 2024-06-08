
import { Router } from "express";
import { listaroferta } from "../controllers/ofertas.controllers.js";

const rutaofertas = Router();

rutaofertas.get("/", listaroferta);


export default rutaofertas;