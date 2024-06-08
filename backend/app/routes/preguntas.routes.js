
import { Router } from "express";
import { listarPregunta } from "../controllers/preguntas.controllers.js";

const rutapreguntas = Router();

rutapreguntas.get("/", listarPregunta);


export default rutapreguntas;