import { Router } from "express";
import { listarProducto, listarProductosVendidos } from "../controllers/productos.controllers.js";


const rutaProductos = Router();

rutaProductos.get("/listar", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);



export default rutaProductos;