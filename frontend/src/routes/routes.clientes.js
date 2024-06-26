import { Router } from "express";
import { menuCliente, mostrarCarritoCompras, mostrarDocs, mostrarEntregas, mostrarHistorialCitas, mostrarHistorialCompras, mostrarListaFavoritos, mostrarPerfilBarbero, mostrarReserva, paginaPrincipalCliente, perfilCliente, realizarCompra, realizarReembolso, realizarReserva } from "../controllers/controllers.cliente.js";

const rutaCliente = Router();

rutaCliente.get("/home", paginaPrincipalCliente);
rutaCliente.get("/menu", menuCliente);
rutaCliente.get("/barbero/:id", mostrarPerfilBarbero);
rutaCliente.get("/reservar", realizarReserva);
rutaCliente.get("/favorito", mostrarListaFavoritos);
rutaCliente.get("/reserva", mostrarReserva);
rutaCliente.get("/entrega", mostrarEntregas);
rutaCliente.get("/reembolso", realizarReembolso);
rutaCliente.get("/cita", mostrarHistorialCitas);
rutaCliente.get("/compra", mostrarHistorialCompras);
rutaCliente.get("/carrito", mostrarCarritoCompras);
rutaCliente.get("/perfil", perfilCliente);
rutaCliente.get("/comprar", realizarCompra);
rutaCliente.get("/docs", mostrarDocs);

export default rutaCliente;