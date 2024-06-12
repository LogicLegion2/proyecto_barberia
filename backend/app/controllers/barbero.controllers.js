import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarBarbero = async (req, res) => {
    try {
        const [rowsb] = await pool.query("CALL LL_VER_BARBERO()");
        // res.json(rows);
        const [rowss] = await pool.query("CALL LL_VER_SERVICIOS()");
        // res.json(respuesta);
        res.render("views.barbero.ejs", { barberos: rowsb, servicios: rowss });
        // res.render("views.barbero.ejs")
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarBarbero = async (req, res) => {
    try {
        // Obtener el patrón de búsqueda de la consulta
        const { desc } = req.query;
        
        // Verificar si se proporcionó un patrón de búsqueda válido
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query("CALL LL_BUSCAR_BARBERO(?)", [desc]);
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const verPerfil = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}




