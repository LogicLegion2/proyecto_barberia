import { Router } from "express";
import { crearBarberoFavorito, crearOfertaFavorito, crearProductoFavorito, crearServicioFavorito, listarFavoritos } from "../controllers/favoritos.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaFavoritos = Router();

rutaFavoritos.get("/listar/:id", listarFavoritos);
rutaFavoritos.post("/crear/barbero", crearBarberoFavorito);
rutaFavoritos.post("/crear/servicio", crearServicioFavorito);
rutaFavoritos.post("/crear/oferta", crearOfertaFavorito);
rutaFavoritos.post("/crear/producto", crearProductoFavorito);

export default rutaFavoritos;