import { Router } from "express";
import { listarproducto } from "../controllers/productos.controllers.js";


const rutaproductos = Router();

rutaproductos.get("/", listarproducto);



export default rutaproductos;