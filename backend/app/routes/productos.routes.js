import { Router } from "express";
import { buscarProducto, crearProducto, desactivarProducto, editarProducto, insertarProductoVenta, listarProducto, listarProductosVendidos, obtenerProducto } from "../controllers/productos.controllers.js";


const rutaProductos = Router();

rutaProductos.get("/", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);
rutaProductos.get("/buscar", buscarProducto);
rutaProductos.post("/crear", crearProducto);
rutaProductos.get("/:id", obtenerProducto);
rutaProductos.post("/prod/venta", insertarProductoVenta);
rutaProductos.get("/obtener/:id", obtenerProducto);
rutaProductos.post("/editar", editarProducto);
rutaProductos.post("/desactivar", desactivarProducto);

export default rutaProductos;