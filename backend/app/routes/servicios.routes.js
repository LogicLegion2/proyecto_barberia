
import { Router } from "express";
import { buscarServicio, crearServicio, desactivarServicio, editarServicio, listarServicio, obtenerServicio } from "../controllers/servicios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

/**
 * Estas son las rutas del backend de servicios en mi proyecto
 * @type {object}
 */
const rutaServicios = Router();

rutaServicios.get("/", listarServicio);
rutaServicios.get("/buscar", buscarServicio);
rutaServicios.post("/crear", crearServicio);
rutaServicios.get("/obtener/:id", obtenerServicio);
rutaServicios.post("/editar", editarServicio);
rutaServicios.post("/desactivar", desactivarServicio);


export default rutaServicios;