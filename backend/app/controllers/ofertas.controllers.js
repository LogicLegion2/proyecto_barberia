import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarOferta = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_OFERTAS()");
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};