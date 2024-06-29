/**
 * Este es el controlador de ubicaciones
 * @module ctr-ubicaciones
 */
import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

/**
 * Esta funcion sirve para mostrar todas las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarUbicacion = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_UBICACIONES()");
        const ubicaciones = rows[0];

        ubicaciones.forEach(ubicacion => {
            if (ubicacion.fotoUbicacion) {
                try {
                    ubicacion.img64 = Buffer.from(ubicacion.fotoUbicacion).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    ubicacion.img64 = null;
                }
            } else {
                ubicacion.img64 = null;
            }
        });
        res.status(200).json({ ubicaciones: ubicaciones });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para buscar las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const buscarUbicacion = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_UBICACION('${desc}')`);
        const ubicaciones = rows[0];

        ubicaciones.forEach(ubicacion => {
            if (ubicacion.foto) {
                try {
                    ubicacion.img64 = Buffer.from(ubicacion.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    ubicacion.img64 = null;
                }
            } else {
                ubicacion.img64 = null;
            }
        });
        res.status(200).json({ ubicaciones: ubicaciones })
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const crearUbicacion = async (req, res) => {
    const input = req.body;
    const {
        titulo,
        ubicacion,
        descripcion,
        foto
    } = input

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_UBICACION('${titulo}','${ubicacion}','${descripcion}','${foto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para obtener las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const obtenerUbicacion = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_OBTENER_UBICACION('${id}');`);
        if (respuesta.length > 0) {
            res.status(200).json(respuesta[0][0][0]);
        } else {
            res.status(404).json({ mensaje: "Ubicación no encontrada" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para editar las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const editarUbicacion = async (req, res) => {
    const titulo = req.body.titulo;
    const ubicacion = req.body.ubicacion;
    const descripcion = req.body.descripcion;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_UBICACION('${titulo}','${ubicacion}','${descripcion}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(200).json(respuesta);
    }
};

/**
 * Esta funcion sirve para desactivar las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const desactivarUbicacion = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_UBICACION('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { listarUbicacion, buscarUbicacion, crearUbicacion, obtenerUbicacion, editarUbicacion, desactivarUbicacion }