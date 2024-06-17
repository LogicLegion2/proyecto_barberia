import { Router } from "express";
import { cambiarContrasena, cambiarCorreo, cambiarNombre, cambiarTelefono, crearBarbero, crearUsuario, listarUsuario, login, logout, menuAdmin, menuCliente, mostrarLogin, registroUsuario, validarToken, verPerfil, verPerfilAdmin } from "../controllers/usuarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaUsuarios = Router();

rutaUsuarios.get("/listar", listarUsuario);
rutaUsuarios.get("/menu/cliente", menuCliente);
rutaUsuarios.get("/menu/admin", menuAdmin);
rutaUsuarios.get("/ver/perfil/admin/:id", verPerfilAdmin);
rutaUsuarios.get("/ver/perfil/cliente/:id", verPerfil);
rutaUsuarios.get("/ver/login", mostrarLogin);
rutaUsuarios.post("/login", login);
rutaUsuarios.post("/registro", registroUsuario);
rutaUsuarios.post("/registrar", crearUsuario);
rutaUsuarios.post("/registrar/barbero", crearBarbero);
rutaUsuarios.put("/cambiar/contrasena", cambiarContrasena);
rutaUsuarios.put("/cambiar/nombre", cambiarNombre);
rutaUsuarios.put("/cambiar/telefono", cambiarTelefono);
rutaUsuarios.put("/cambiar/correo", cambiarCorreo);
rutaUsuarios.post("/logout", logout);
rutaUsuarios.post("/oauth", validarToken)

export default rutaUsuarios;