import { Router } from "express";
import { crearComentario, eliminarComentario, listarComentario, verComentariosBarbero } from "../controllers/comentarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaComentarios = Router();

rutaComentarios.get("/listar", listarComentario);
rutaComentarios.post("/crear", crearComentario);
rutaComentarios.put("/eliminar", eliminarComentario);
rutaComentarios.put("/ver/comentario", verComentariosBarbero);

export default rutaComentarios;