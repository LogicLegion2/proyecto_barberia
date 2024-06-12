
import { Router } from "express";
import { buscarOferta, crearOferta, desactivarOferta, editarOferta, listarOferta } from "../controllers/ofertas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaOfertas = Router();

rutaOfertas.get("/listar", verificarToken, listarOferta);
rutaOfertas.put("/buscar", verificarToken, buscarOferta);
rutaOfertas.post("/crear", verificarToken, crearOferta);
rutaOfertas.put("/editar", verificarToken, editarOferta);
rutaOfertas.put("/desactivar", verificarToken, desactivarOferta);


export default rutaOfertas;