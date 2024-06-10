
import { Router } from "express";
import { crearOferta, editarOferta, listarOferta } from "../controllers/ofertas.controllers.js";

const rutaOfertas = Router();

rutaOfertas.get("/listar", listarOferta);
rutaOfertas.post("/crear", crearOferta);
rutaOfertas.put("/editar", editarOferta);


export default rutaOfertas;