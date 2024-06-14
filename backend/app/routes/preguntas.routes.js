
import { Router } from "express";
import { crearPregunta, desactivarPregunta, editarPregunta, listarPregunta } from "../controllers/preguntas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaPreguntas = Router();

rutaPreguntas.get("/listar", listarPregunta);
rutaPreguntas.post("/crear", verificarToken, crearPregunta);
rutaPreguntas.put("/editar", verificarToken, editarPregunta);
rutaPreguntas.put("/desactivar", verificarToken, desactivarPregunta);


export default rutaPreguntas;