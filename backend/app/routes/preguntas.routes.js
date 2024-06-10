
import { Router } from "express";
import { crearPregunta, editarPregunta, listarPregunta } from "../controllers/preguntas.controllers.js";

const rutaPreguntas = Router();

rutaPreguntas.get("/listar", listarPregunta);
rutaPreguntas.post("/crear", crearPregunta);
rutaPreguntas.put("/editar", editarPregunta);


export default rutaPreguntas;