
import { Router } from "express";
import { listarUsuario } from "../controllers/usuarios.controllers.js";

const rutausuarios = Router();

rutausuarios.get("/", listarUsuario);


export default rutausuarios;