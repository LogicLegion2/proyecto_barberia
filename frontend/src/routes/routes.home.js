import { Router } from "express";
import { login, paginaEntregasAdmin, paginaHistorialCitas, paginaHistorialCompras, paginaHistorialReservas, paginaListaFav, paginaOferta, paginaPrincipalAdmin, paginaPrincipalBarbero, paginaPrincipalCliente } from "../controllers/controllers.home.js";

const rutaHome = Router();

rutaHome.get("/login", login);
rutaHome.get("/cliente", paginaPrincipalCliente);
rutaHome.get("/admin", paginaPrincipalAdmin);
rutaHome.get("/admin/perfil", paginaPrincipalAdmin);
rutaHome.get("/barbero", paginaPrincipalBarbero);
rutaHome.get("/entregas/admin", paginaEntregasAdmin);
rutaHome.get("/historial/cita", paginaHistorialCitas);
rutaHome.get("/historial/compra", paginaHistorialCompras);
rutaHome.get("/historial/reserva", paginaHistorialReservas);
rutaHome.get("/lista/fav", paginaListaFav);
rutaHome.get("/ofertas", paginaOferta);

export default rutaHome;