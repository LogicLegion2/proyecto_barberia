
import { Router } from "express";
import { listarComentario } from "../controllers/comentarios.controllers.js";

const rutacomentarios = Router();

rutacomentarios.get("/", listarComentario);


export default rutacomentarios;