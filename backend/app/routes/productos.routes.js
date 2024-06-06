import { Router } from "express";
import { listarproducto, mostrarproducto } from "../controllers/productos.controllers.js";

const rutaproductos = Router();

rutaproductos.get("/", listarproducto);
rutaproductos.get("/:id", mostrarproducto);


export default rutaproductos;