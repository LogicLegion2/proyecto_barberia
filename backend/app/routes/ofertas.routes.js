
import { Router } from "express";
import { listarOferta } from "../controllers/ofertas.controllers.js";

const rutaofertas = Router();

rutaofertas.get("/", listarOferta);


export default rutaofertas;