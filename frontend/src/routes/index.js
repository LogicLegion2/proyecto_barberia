import { Router } from "express";
import rutaCliente from "./routes.clientes.js";
import rutaBarbero from "./routes.barberos.js";
import rutaAdmin from "./routes.admins.js";

const ruta = Router();

ruta.use("/clientes", rutaCliente);
ruta.use("/barberos", rutaBarbero);
ruta.use("/admins", rutaAdmin);

export default ruta;