
import { Router } from "express";
import { listarproductosVendidos } from "../controllers/productosVendidos.js";

const rutaproductosVendidos = Router();

rutaproductosVendidos.get("/", listarproductosVendidos);


export default rutaproductosVendidos;