
import { Router } from "express";
import { listarPregunta } from "../controllers/preguntas.controllers.js";

const rutaPreguntas = Router();

rutaPreguntas.get("/", listarPregunta);


export default rutaPreguntas;