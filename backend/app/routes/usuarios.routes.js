import { Router } from "express";
import { cambiarContrasena, cambiarCorreo, cambiarNombre, cambiarTelefono, crearBarbero, crearUsuario, listarUsuario, login, logout, registroUsuario, validarToken, verPerfil } from "../controllers/usuarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaUsuarios = Router();

rutaUsuarios.get("/listar", verificarToken, listarUsuario);
rutaUsuarios.get("/ver/perfil", verificarToken, verPerfil);
rutaUsuarios.post("/login", login);
rutaUsuarios.post("/registro", registroUsuario);
rutaUsuarios.post("/registrar", verificarToken, crearUsuario);
rutaUsuarios.post("/registrar/barbero", verificarToken, crearBarbero);
rutaUsuarios.put("/cambiar/contrasena", verificarToken, cambiarContrasena);
rutaUsuarios.put("/cambiar/nombre", verificarToken, cambiarNombre);
rutaUsuarios.put("/cambiar/telefono", verificarToken, cambiarTelefono);
rutaUsuarios.put("/cambiar/correo", verificarToken, cambiarCorreo);
rutaUsuarios.post("/logout", verificarToken, logout);
rutaUsuarios.post("/oauth", verificarToken, validarToken)

export default rutaUsuarios;