
import { Router } from "express";
import { buscarOferta, crearOferta, desactivarOferta, editarOferta, listarOferta } from "../controllers/ofertas.controllers.js";


const rutaOfertas = Router();

rutaOfertas.get("/listar", listarOferta);
rutaOfertas.put("/buscar", buscarOferta);
rutaOfertas.post("/crear", crearOferta);
rutaOfertas.put("/editar", editarOferta);
rutaOfertas.put("/desactivar", desactivarOferta);



export default rutaOfertas;