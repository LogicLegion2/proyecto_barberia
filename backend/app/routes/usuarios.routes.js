
import { Router } from "express";
import { cambiarContrasena, cambiarCorreo, cambiarNombre, cambiarTelefono, crearBarbero, crearUsuario, listarUsuario, login, registroUsuario, verPerfil } from "../controllers/usuarios.controllers.js";

const rutaUsuarios = Router();

rutaUsuarios.get("/listar", listarUsuario);
rutaUsuarios.post("/login", login);
rutaUsuarios.post("/registrar", crearUsuario);
rutaUsuarios.post("/registro", registroUsuario);
rutaUsuarios.post("/ver/perfil", verPerfil);
rutaUsuarios.post("/registrar/barbero", crearBarbero);
rutaUsuarios.put("/cambiar/contrasena", cambiarContrasena);
rutaUsuarios.put("/cambiar/nombre", cambiarNombre);
rutaUsuarios.put("/cambiar/telefono", cambiarTelefono);
rutaUsuarios.put("/cambiar/correo", cambiarCorreo);


export default rutaUsuarios;