
import { Router } from "express";
import { listarComentario } from "../controllers/comentarios.controllers.js";

const rutaComentarios = Router();

rutaComentarios.get("/", listarComentario);


export default rutaComentarios;