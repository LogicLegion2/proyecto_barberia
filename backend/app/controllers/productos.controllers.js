import { pool } from "../config/mysql.db.js";
import mysql from "mysql2/promise.js"; 
import {config} from "dotenv"
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

