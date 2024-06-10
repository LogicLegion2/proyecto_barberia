import { Router } from "express";
import { crearPago, crearReembolso } from "../controllers/ventas.controllers.js";

const rutaVentas = Router();

rutaVentas.post("/crear", crearPago);
rutaVentas.post("/crear/reembolso", crearReembolso);

export default rutaVentas;