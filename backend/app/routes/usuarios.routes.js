import { Router } from "express";
import { buscarUsuario, cambiarContrasena, cambiarContrasenaBarbero, cambiarCorreo, cambiarCorreoBarbero, cambiarDescripcionBarbero, cambiarFoto, cambiarFotoBarbero, cambiarNombre, cambiarNombreBarbero, cambiarTelefono, cambiarTelefonoBarbero, crearBarbero, crearUsuario, desactivarUsuario, listarUsuario, login, logout, registroUsuario, verPerfil, verPerfilAdmin } from "../controllers/usuarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaUsuarios = Router();

rutaUsuarios.get("/", verificarToken, listarUsuario);
rutaUsuarios.get("/buscar", buscarUsuario);
rutaUsuarios.get("/perfil/admin/:id", verificarToken, verPerfilAdmin);
rutaUsuarios.get("/perfil/cliente/:id", verPerfil);
rutaUsuarios.post("/login", login);
rutaUsuarios.post("/registro", registroUsuario);
rutaUsuarios.post("/registrar", crearUsuario);
rutaUsuarios.post("/barbero", crearBarbero);
rutaUsuarios.post("/nombre/:id", verificarToken, cambiarNombre);
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