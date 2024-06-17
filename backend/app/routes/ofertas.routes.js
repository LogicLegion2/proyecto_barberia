
import { Router } from "express";
import { buscarOferta, crearOferta, desactivarOferta, editarOferta, listarOferta, obtenerOferta, obtenerProductos } from "../controllers/ofertas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaOfertas = Router();

rutaOfertas.get("/listar", listarOferta);
rutaOfertas.put("/buscar", buscarOferta);
rutaOfertas.post("/crear", crearOferta);
rutaOfertas.get("/obtener/:id", obtenerOferta);
rutaOfertas.get("/editar/:id", obtenerProductos);
rutaOfertas.put("/editar/:id", editarOferta);
rutaOfertas.put("/desactivar", desactivarOferta);


export default rutaOfertas;