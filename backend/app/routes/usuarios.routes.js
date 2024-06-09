
import { Router } from "express";
import { crearUsuario, listarUsuario, login } from "../controllers/usuarios.controllers.js";

const rutausuarios = Router();

rutausuarios.get("/listar", listarUsuario);
rutausuarios.post("/login", login);
rutausuarios.post("/registrar", crearUsuario);


export default rutausuarios;