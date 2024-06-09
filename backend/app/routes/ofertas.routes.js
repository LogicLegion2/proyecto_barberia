
import { Router } from "express";
import { editarOferta, listarOferta } from "../controllers/ofertas.controllers.js";

const rutaOfertas = Router();

rutaOfertas.get("/listar", listarOferta);
rutaOfertas.put("/editar", editarOferta);


export default rutaOfertas;