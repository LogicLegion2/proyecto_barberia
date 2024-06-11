
import { Router } from "express";
import { buscarOferta, crearOferta, editarOferta, listarOferta } from "../controllers/ofertas.controllers.js";
import { buscarBarbero } from "../controllers/barbero.controllers.js";

const rutaOfertas = Router();

rutaOfertas.get("/listar", listarOferta);
rutaOfertas.put("/buscar", buscarOferta);
rutaOfertas.post("/crear", crearOferta);
rutaOfertas.put("/editar", editarOferta);


export default rutaOfertas;