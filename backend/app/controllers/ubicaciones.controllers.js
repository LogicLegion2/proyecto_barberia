import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarUbicacion = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_UBICACIONES()");
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};
export const buscarUbicacion = async (req, res) => {
    try {
        // Obtener el patrón de búsqueda de la consulta
        const { desc } = req.query;
        
        // Verificar si se proporcionó un patrón de búsqueda válido
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query("CALL LL_BUSCAR_UBICACION(?)", [desc]);
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const crearUbicacion = async (req, res) => {
    const ubicacion = req.body.ubicacion;
    const descripcion = req.body.descripcion;
    const foto = req.body.foto;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_UBICACION('${ubicacion}','${descripcion}','${foto}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const editarUbicacion = async (req, res) => {
    const ubicacion = req.body.ubicacion;
    const descripcion = req.body.descripcion;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_UBICACION('${ubicacion}','${descripcion}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const desactivarUbicacion = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_UBICACION('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}