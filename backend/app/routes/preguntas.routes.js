
import { Router } from "express";
import { crearPregunta, desactivarPregunta, editarPregunta, listarPregunta } from "../controllers/preguntas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaPreguntas = Router();

rutaPreguntas.get("/listar", listarPregunta);
rutaPreguntas.post("/crear", crearPregunta);
rutaPreguntas.put("/editar", editarPregunta);
rutaPreguntas.put("/desactivar", desactivarPregunta);


export default rutaPreguntas;