import { Router } from "express";
import { crearPago, crearReembolso, historialCompra, verCarroCompras, verEntregas, verEntregasAdmin} from "../controllers/ventas.controllers.js";

const rutaVentas = Router();

rutaVentas.post("/crear", crearPago);
rutaVentas.post("/crear/reembolso", crearReembolso);
rutaVentas.post("/ver/carroCompras", verCarroCompras);
rutaVentas.get("/historial/compra", historialCompra);
rutaVentas.get("/ver/entregas/admin", verEntregasAdmin);
rutaVentas.get("/ver/entregas", verEntregas);



export default rutaVentas;