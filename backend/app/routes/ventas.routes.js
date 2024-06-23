import { Router } from "express";
import { buscarProductoVendido, crearPago, crearReembolso, historialCompra, verCarroCompras, verEntregas, verEntregasAdmin, verReservasProductos } from "../controllers/ventas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaVentas = Router();

rutaVentas.post("/", crearPago);
rutaVentas.post("/reembolso", crearReembolso);
rutaVentas.get("/historial/:id", historialCompra);
rutaVentas.get("/buscar", buscarProductoVendido);
rutaVentas.get("/entregas/admin", verificarToken, verEntregasAdmin);
rutaVentas.get("/entregas/:id", verEntregas);
rutaVentas.get("/productos", verificarToken,verReservasProductos);
rutaVentas.get("/carrito/:id", verCarroCompras);

export default rutaVentas; 