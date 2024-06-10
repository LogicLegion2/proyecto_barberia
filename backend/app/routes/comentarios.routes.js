import { Router } from "express";
import { crearComentario, eliminarComentario, listarComentario } from "../controllers/comentarios.controllers.js";

const rutaComentarios = Router();

rutaComentarios.get("/listar", listarComentario);
rutaComentarios.post("/crear", crearComentario);
rutaComentarios.put("/eliminar", eliminarComentario);

export default rutaComentarios;