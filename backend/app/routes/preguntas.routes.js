
import { Router } from "express";
import { editarPregunta, listarPregunta } from "../controllers/preguntas.controllers.js";

const rutaPreguntas = Router();

rutaPreguntas.get("/listar", listarPregunta);
rutaPreguntas.put("/editar", editarPregunta);


export default rutaPreguntas;