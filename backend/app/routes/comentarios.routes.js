
import { Router } from "express";
import { eliminarComentario, listarComentario } from "../controllers/comentarios.controllers.js";

const rutaComentarios = Router();

rutaComentarios.get("/listar", listarComentario);
rutaComentarios.put("/eliminar", eliminarComentario);

export default rutaComentarios;