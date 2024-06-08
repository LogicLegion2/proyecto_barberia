
import { Router } from "express";
import { listarcomentario } from "../controllers/comentarios.controllers.js";

const rutacomentarios = Router();

rutacomentarios.get("/", listarcomentario);


export default rutacomentarios;