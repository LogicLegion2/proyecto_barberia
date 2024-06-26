import { Router } from "express";
import { crearComentario, eliminarComentario } from "../controllers/comentarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

/**
 * Estas son las rutas del backend de comentarios en mi proyecto 
 * @type {object}
 */
const rutaComentarios = Router();

rutaComentarios.post("/crear", crearComentario);
rutaComentarios.post("/eliminar", eliminarComentario);

export default rutaComentarios;