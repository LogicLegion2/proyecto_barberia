
import { Router } from "express";
import { crearUsuario, listarUsuario, login } from "../controllers/usuarios.controllers.js";

const rutaUsuarios = Router();

rutaUsuarios.get("/listar", listarUsuario);
rutaUsuarios.post("/login", login);
rutaUsuarios.post("/registrar", crearUsuario);


export default rutaUsuarios;