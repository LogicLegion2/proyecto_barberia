import { Router } from "express";
import { buscarOferta, crearOferta, desactivarOferta, editarOferta, listarOferta, obtenerOferta } from "../controllers/ofertas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


/**
 * Estas son las rutas del backend de ofertas en mi proyecto 
 * @type {object}
 */
const rutaOfertas = Router();

rutaOfertas.get("/", listarOferta);
rutaOfertas.get("/buscar", buscarOferta);
rutaOfertas.post("/crear", crearOferta);
rutaOfertas.get("/obtener/:id", obtenerOferta);
rutaOfertas.post("/editar", editarOferta);
rutaOfertas.post("/desactivar", desactivarOferta);

export default rutaOfertas;