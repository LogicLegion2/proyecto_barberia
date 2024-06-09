
import { Router } from "express";
import { listarOferta } from "../controllers/ofertas.controllers.js";

const rutaOfertas = Router();

rutaOfertas.get("/", listarOferta);


export default rutaOfertas;