import { Router } from "express";
import { buscarProductoVendido, crearPago, crearReembolso, historialCompra, verCarroCompras, verEntregas, verEntregasAdmin, verReservasProductos } from "../controllers/ventas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

/**
 * Estas son las rutas del backend de ventas en mi proyecto
 * @type {object}
 */
const rutaVentas = Router();

rutaVentas.post("/", crearPago);
rutaVentas.post("/reembolso", crearReembolso);
rutaVentas.get("/historial/:id", historialCompra);
rutaVentas.get("/buscar", buscarProductoVendido);
rutaVentas.get("/entregas/admin", verEntregasAdmin);
rutaVentas.get("/entregas/:id", verEntregas);
rutaVentas.get("/productos",verReservasProductos);
rutaVentas.get("/carrito/:id", verCarroCompras);

export default rutaVentas; 