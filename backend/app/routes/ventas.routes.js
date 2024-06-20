import { Router } from "express";
import { crearPago, crearReembolso, historialCompra, verCarroCompras, verEntregas, verEntregasAdmin, verReservasProductos } from "../controllers/ventas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaVentas = Router();

rutaVentas.post("/crear", crearPago);
rutaVentas.post("/crear/reembolso", crearReembolso);
rutaVentas.get("/historial/compra/:id", historialCompra);
rutaVentas.get("/ver/entregas/admin", verEntregasAdmin);
rutaVentas.get("/ver/entregas", verEntregas);
rutaVentas.get("/reservas/productos", verReservasProductos);
rutaVentas.get("/ver/carrito/:id", verCarroCompras);

export default rutaVentas; 