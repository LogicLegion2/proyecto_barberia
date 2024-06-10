import { Router } from "express";
<<<<<<< Updated upstream
import { listarproducto } from "../controllers/productos.controllers.js";
=======
import { buscarProducto, listarProducto, listarProductosVendidos } from "../controllers/productos.controllers.js";
>>>>>>> Stashed changes


const rutaproductos = Router();

<<<<<<< Updated upstream
rutaproductos.get("/", listarproducto);
=======
rutaProductos.get("/listar", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);
rutaProductos.get("/buscar", buscarProducto);
>>>>>>> Stashed changes



export default rutaproductos;