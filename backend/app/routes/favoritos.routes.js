import { Router } from "express";
import { crearBarberoFavorito, crearOfertaFavorito, crearProductoFavorito, crearServicioFavorito, listarFavoritos } from "../controllers/favoritos.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

/**
 * Estas son las rutas del backend de favoritos en mi proyecto 
 * @type {object}
 */
const rutaFavoritos = Router();

rutaFavoritos.get("/:id", listarFavoritos);
rutaFavoritos.post("/barbero/:id", crearBarberoFavorito);
rutaFavoritos.post("/servicio/:id", crearServicioFavorito);
rutaFavoritos.post("/oferta/:id", crearOfertaFavorito);
rutaFavoritos.post("/producto/:id", crearProductoFavorito);

export default rutaFavoritos;