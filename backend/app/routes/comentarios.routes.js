import { Router } from "express";
import { crearComentario, eliminarComentario, listarComentario, verComentariosBarbero } from "../controllers/comentarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaComentarios = Router();

rutaComentarios.get("/listar", verificarToken, listarComentario);
rutaComentarios.post("/crear", verificarToken, crearComentario);
rutaComentarios.put("/eliminar", verificarToken, eliminarComentario);
rutaComentarios.put("/ver/comentario", verificarToken, verComentariosBarbero);

export default rutaComentarios;