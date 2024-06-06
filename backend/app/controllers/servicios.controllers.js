import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";

// Configura las variables de entorno
config();

export const listarservicio = async (req, res) => {
    try {
        // Ejecuta la consulta utilizando pool.execute
        const [rows, fields] = await pool.execute("CALL LL_VER_SERVICIOS()");
        
        // Envía la respuesta JSON al cliente
        res.json(rows);
    } catch (error) {
        // Maneja los errores
        res.status(500).json({ error: error.message });
    }
};
