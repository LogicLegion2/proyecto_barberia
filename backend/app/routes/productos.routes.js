import { Router } from "express";
import { buscarProducto, crearProducto, desactivarProducto, editarProducto, listarProducto, listarProductosVendidos } from "../controllers/productos.controllers.js";


const rutaProductos = Router();

rutaProductos.get("/listar", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);
rutaProductos.get("/buscar", buscarProducto);
rutaProductos.post("/crear", crearProducto);
rutaProductos.put("/editar", editarProducto);
rutaProductos.put("/desactivar", desactivarProducto);




export default rutaProductos;