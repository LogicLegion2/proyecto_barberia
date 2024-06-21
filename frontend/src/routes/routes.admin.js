import { Router } from "express";
import { crearBarbero, crearOferta, crearPregunta, crearProducto, crearServicio, crearUbicacion, crearUsuario, editarOferta, editarPregunta, editarProducto, editarServicio, editarUbicacion, menuAdmin, mostrarHistorialReservas, mostrarOferta, mostrarPerfilBarbero, mostrarPregunta, mostrarProducto, mostrarProductosVendidos, mostrarReservasProductos, mostrarServicio, mostrarUbicacion, mostrarUsuario, mostrartEntregas, mostrartReservas, paginaPrincipalAdmin, perfilAdmin } from "../controllers/controllers.admin.js";

const rutaAdmin = Router();

rutaAdmin.get("/home", paginaPrincipalAdmin);
rutaAdmin.get("/menu", menuAdmin);
rutaAdmin.get("/barbero", mostrarPerfilBarbero);
rutaAdmin.get("/producto", mostrarProducto);
rutaAdmin.get("/producto/editar", editarProducto);
rutaAdmin.get("/producto/crear", crearProducto);
rutaAdmin.get("/servicio", mostrarServicio);
rutaAdmin.get("/servicio/editar", editarServicio);
rutaAdmin.get("/servicio/crear", crearServicio);
rutaAdmin.get("/oferta", mostrarOferta);
rutaAdmin.get("/oferta/editar", editarOferta);
rutaAdmin.get("/oferta/crear", crearOferta);
rutaAdmin.get("/ubicacion", mostrarUbicacion);
rutaAdmin.get("/ubicacion/editar", editarUbicacion);
rutaAdmin.get("/ubicacion/crear", crearUbicacion);
rutaAdmin.get("/pregunta", mostrarPregunta);
rutaAdmin.get("/pregunta/editar", editarPregunta);
rutaAdmin.get("/pregunta/crear", crearPregunta);
rutaAdmin.get("/usuario", mostrarUsuario);
rutaAdmin.get("/crear/usuario", crearUsuario);
rutaAdmin.get("/crear/barbero", crearBarbero);
rutaAdmin.get("/reserva", mostrartReservas);
rutaAdmin.get("/entrega", mostrartEntregas);
rutaAdmin.get("/vendido", mostrarProductosVendidos);
rutaAdmin.get("/reserva/producto", mostrarReservasProductos);
rutaAdmin.get("/historial", mostrarHistorialReservas);
rutaAdmin.get("/perfil", perfilAdmin);

export default rutaAdmin;