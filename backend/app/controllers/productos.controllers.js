import { pool } from "../config/mysql.db.js";
import mysql from "mysql2/promise.js"; 
import {config} from "dotenv";
import jwt from "jsonwebtoken";
config(); 

export const listarProducto = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_PRODUCTOS()"); 
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const listarProductosVendidos = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_PRODUCTOS_VENDIDOS()");
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const editarProducto = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_PRODUCTO('${nombre}','${descripcion}','${precio}','${cantidad}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}