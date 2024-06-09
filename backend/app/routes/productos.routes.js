import { Router } from "express";
import { listarProducto, listarProductosVendidos } from "../controllers/productos.controllers.js";


const rutaproductos = Router();

rutaproductos.get("/listar", listarProducto);
rutaproductos.get("/vendidos", listarProductosVendidos);



export default rutaproductos;