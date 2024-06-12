import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarServicio = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_SERVICIOS()");
        // res.json(respuesta);
        // res.render("views.barbero.ejs", { servicios: rows });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarServicio = async (req, res) => {
    try {
        // Obtener el patrón de búsqueda de la consulta
        const { desc } = req.query;
        
        // Verificar si se proporcionó un patrón de búsqueda válido
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_SERVICIO(?)`, [desc]);
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const crearServicio = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const foto = req.body.foto;
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_SERVICIO('${nombre}','${descripcion}','${precio}','${foto}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error, "La reserva con estos valores ya fue tomada");
    }
};

export const editarServicio = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_SERVICIO('${nombre}','${descripcion}','${precio}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const desactivarServicio = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_SERVICIO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}
