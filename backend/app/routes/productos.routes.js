import { Router } from "express";
import { buscarProducto, crearProducto, desactivarProducto, editarProducto, insertarProductoVenta, listarProducto, listarProductosVendidos, obtenerProducto } from "../controllers/productos.controllers.js";


const rutaProductos = Router();
rutaProductos.get("/agregarp", (req, res) => {
    res.render("views.ingresar_producto.ejs", { id: req.query.id });
});
rutaProductos.get("/listar", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);
rutaProductos.get("/buscar", buscarProducto);
rutaProductos.post("/crear", crearProducto);
rutaProductos.get("/obtener/:id", obtenerProducto);
rutaProductos.get("/editar", (req, res) => {
    res.render("views.editar_producto.ejs", { id: req.query.id });
});
rutaProductos.post("/insertar/prod/venta", insertarProductoVenta);
rutaProductos.post("/editar", editarProducto);
rutaProductos.post("/desactivar", desactivarProducto);



export default rutaProductos;