import { Router } from "express";
import { crearComentario, eliminarComentario } from "../controllers/comentarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaComentarios = Router();

rutaComentarios.post("/crear", crearComentario);
rutaComentarios.post("/eliminar", eliminarComentario);

export default rutaComentarios;