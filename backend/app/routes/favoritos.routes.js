import { Router } from "express";
import { crearBarberoFavorito, crearOfertaFavorito, crearProductoFavorito, crearServicioFavorito, listarFavoritos } from "../controllers/favoritos.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaFavoritos = Router();

rutaFavoritos.get("/listar/:id", listarFavoritos);
rutaFavoritos.post("/crear/barbero", verificarToken, crearBarberoFavorito);
rutaFavoritos.post("/crear/servicio", verificarToken, crearServicioFavorito);
rutaFavoritos.post("/crear/oferta", verificarToken, crearOfertaFavorito);
rutaFavoritos.post("/crear/producto", verificarToken, crearProductoFavorito);

export default rutaFavoritos;