import { Router } from "express";
import rutaHome from "./routes.home.js";
import rutaCliente from "./routes.clientes.js";
import rutaAdmin from "./routes.admin.js";
import rutaBarbero from "./routes.barbero.js";

const ruta = Router();

ruta.use("/home", rutaHome);
ruta.use("/cliente", rutaCliente);
ruta.use("/admin", rutaAdmin);
ruta.use("/barbero", rutaBarbero);

export default ruta;