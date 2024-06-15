import { Router } from "express";
import { buscarProducto, crearProducto, desactivarProducto, editarProducto, insertarProductoVenta, listarProducto, listarProductosVendidos } from "../controllers/productos.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaProductos = Router();

rutaProductos.get("/listar", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);
rutaProductos.get("/buscar", verificarToken, buscarProducto);
rutaProductos.post("/crear", verificarToken, crearProducto);
rutaProductos.post("/insertar/prod/venta", verificarToken, insertarProductoVenta);
rutaProductos.put("/editar", verificarToken, editarProducto);
rutaProductos.put("/desactivar", verificarToken, desactivarProducto);



export default rutaProductos;