import { Router } from "express";
import rutaproductos from "./productos.routes.js";
import rutaservicios from "./servicios.routes.js";

const ruta = Router();


ruta.use("/productos", rutaproductos)
ruta.use("/servicio", rutaservicios)

export default ruta;