import { Router } from "express";
import rutaproductos from "./productos.routes.js";

const ruta = Router();


ruta.use("/productos", rutaproductos)

export default ruta;