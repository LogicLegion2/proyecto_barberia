import { Router } from "express";
import { cambiarContrasena, cambiarContrasenaBarbero, cambiarCorreo, cambiarCorreoBarbero, cambiarDescripcionBarbero, cambiarFoto, cambiarFotoBarbero, cambiarNombre, cambiarNombreBarbero, cambiarTelefono, cambiarTelefonoBarbero, crearBarbero, crearUsuario, listarUsuario, login, logout, menuAdmin, menuCliente, mostrarLogin, registroUsuario, validarToken, verPerfil, verPerfilAdmin } from "../controllers/usuarios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaUsuarios = Router();

rutaUsuarios.get("/listar", listarUsuario);
rutaUsuarios.get("/menu/cliente", menuCliente);
rutaUsuarios.get("/menu/admin", verificarToken, menuAdmin);
rutaUsuarios.get("/ver/perfil/admin/:id", verPerfilAdmin);
rutaUsuarios.get("/ver/perfil/cliente/:id", verPerfil);
rutaUsuarios.get("/ver/login", mostrarLogin);
rutaUsuarios.post("/login", login);
rutaUsuarios.post("/registro", registroUsuario);
rutaUsuarios.post("/registrar", crearUsuario);
rutaUsuarios.post("/registrar/barbero", crearBarbero);
rutaUsuarios.post("/cambiar/nombre/:id", cambiarNombre);
rutaUsuarios.post("/cambiar/telefono/:id", cambiarTelefono);
rutaUsuarios.post("/cambiar/correo/:id", cambiarCorreo);
rutaUsuarios.post("/cambiar/foto/:id", cambiarFoto);
rutaUsuarios.post("/cambiar/contrasena/:id", cambiarContrasena);
rutaUsuarios.post("/cambiar/nombre/barbero/:id", cambiarNombreBarbero);
rutaUsuarios.post("/cambiar/telefono/barbero/:id", cambiarTelefonoBarbero);
rutaUsuarios.post("/cambiar/correo/barbero/:id", cambiarCorreoBarbero);
rutaUsuarios.post("/cambiar/foto/barbero/:id", cambiarFotoBarbero);
rutaUsuarios.post("/cambiar/descripcion/barbero/:id", cambiarDescripcionBarbero);
rutaUsuarios.post("/cambiar/contrasena/barbero/:id", cambiarContrasenaBarbero);
rutaUsuarios.post("/logout", logout);

export default rutaUsuarios;