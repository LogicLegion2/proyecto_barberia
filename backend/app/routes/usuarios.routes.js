import { Router } from "express";
import { buscarUsuario, cambiarContrasena, cambiarContrasenaBarbero, cambiarCorreo, cambiarCorreoBarbero, cambiarDescripcionBarbero, cambiarFoto, cambiarFotoBarbero, cambiarNombre, cambiarNombreBarbero, cambiarTelefono, cambiarTelefonoBarbero, crearBarbero, crearUsuario, desactivarUsuario, listarUsuario, login, logout, registroUsuario, verPerfil, verPerfilAdmin } from "../controllers/usuarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

/**
 * Estas son las rutas del backend de usuarios en mi proyecto
 * @type {object}
 */
const rutaUsuarios = Router();

rutaUsuarios.get("/", listarUsuario);
rutaUsuarios.get("/buscar", buscarUsuario);
rutaUsuarios.get("/admin/:id", verPerfilAdmin);
rutaUsuarios.get("/cliente/:id", verPerfil);
rutaUsuarios.post("/login", login);
rutaUsuarios.post("/registro", registroUsuario);
rutaUsuarios.post("/registrar", crearUsuario);
rutaUsuarios.post("/barbero", crearBarbero);
rutaUsuarios.post("/nombre/:id", cambiarNombre);
rutaUsuarios.post("/telefono/:id", cambiarTelefono);
rutaUsuarios.post("/correo/:id", cambiarCorreo);
rutaUsuarios.post("/foto/:id", cambiarFoto);
rutaUsuarios.post("/contrasena/:id", cambiarContrasena);
rutaUsuarios.post("/nombre/barbero/:id", cambiarNombreBarbero);
rutaUsuarios.post("/telefono/barbero/:id", cambiarTelefonoBarbero);
rutaUsuarios.post("/correo/barbero/:id", cambiarCorreoBarbero);
rutaUsuarios.post("/foto/barbero/:id", cambiarFotoBarbero);
rutaUsuarios.post("/descripcion/:id", cambiarDescripcionBarbero);
rutaUsuarios.post("/contrasena/barbero/:id", cambiarContrasenaBarbero);
rutaUsuarios.post("/desactivar", desactivarUsuario);
rutaUsuarios.post("/logout", logout);

export default rutaUsuarios;