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

export const buscarOferta = async (req, res) => {
    try {
        // Obtener el patrón de búsqueda de la consulta
        const { desc } = req.query;
        
        // Verificar si se proporcionó un patrón de búsqueda válido
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query("CALL LL_BUSCAR_OFERTA(?)", [desc]);
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const crearOferta = async (req, res) => {
    const producto1 = req.body.producto1;
    const producto2 = req.body.producto2;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const foto = req.body.foto;
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_OFERTA('${producto1}','${producto2}','${descripcion}','${precio}','${foto}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const editarOferta = async (req, res) => {
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_OFERTA('${descripcion}','${precio}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const desactivarOferta = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_OFERTA('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}