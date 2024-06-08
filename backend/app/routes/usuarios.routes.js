
import { Router } from "express";
import { listarusuario } from "../controllers/usuarios.controllers.js";

const rutausuarios = Router();

rutausuarios.get("/", listarusuario);


export default rutausuarios;