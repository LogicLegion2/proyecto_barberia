import { Router } from "express";
import { buscarPregunta, crearPregunta, desactivarPregunta, editarPregunta, listarPregunta, obtenerPregunta } from "../controllers/preguntas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaPreguntas = Router();

rutaPreguntas.get("/", listarPregunta);
rutaPreguntas.get("/buscar", buscarPregunta);
rutaPreguntas.post("/crear", crearPregunta);
rutaPreguntas.get("/:id", obtenerPregunta);
rutaPreguntas.post("/editar", editarPregunta);
rutaPreguntas.post("/desactivar", desactivarPregunta);


export default rutaPreguntas;