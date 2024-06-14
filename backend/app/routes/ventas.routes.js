import { Router } from "express";
import { crearPago, crearReembolso, historialCompra, verCarroCompras, verEntregas, verEntregasAdmin } from "../controllers/ventas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaVentas = Router();

rutaVentas.post("/crear", verificarToken, crearPago);
rutaVentas.post("/crear/reembolso", verificarToken, crearReembolso);
rutaVentas.get("/historial/compra/:id", historialCompra);
rutaVentas.get("/ver/entregas/admin", verEntregasAdmin);
rutaVentas.get("/ver/entregas", verificarToken, verEntregas);
rutaVentas.post("/ver/carroCompras", verificarToken, verCarroCompras);

export default rutaVentas; 