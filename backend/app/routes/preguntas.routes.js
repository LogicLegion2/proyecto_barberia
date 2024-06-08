
import { Router } from "express";
import { listarpregunta } from "../controllers/preguntas.controllers.js";

const rutapreguntas = Router();

rutapreguntas.get("/", listarpregunta);


export default rutapreguntas;