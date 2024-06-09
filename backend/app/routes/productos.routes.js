import { Router } from "express";
import { editarProducto, listarProducto, listarProductosVendidos } from "../controllers/productos.controllers.js";


const rutaProductos = Router();

rutaProductos.get("/listar", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);
rutaProductos.put("/editar", editarProducto);



export default rutaProductos;