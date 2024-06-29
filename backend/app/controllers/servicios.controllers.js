/**
 * Este es el controlador de servicios
 * @module ctr-servicios
 */
import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

/**
 * Esta funcion sirve para mostrar todos los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const listarServicio = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_SERVICIOS()");
        const servicios = rows[0];

        servicios.forEach(servicio => {
            if (servicio.fotoServicio) {
                try {
                    servicio.img64 = Buffer.from(servicio.fotoServicio).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    servicio.img64 = null;
                }
            } else {
                servicio.img64 = null;
            }
        });
        res.status(200).json({ servicios: servicios });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para buscar los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const buscarServicio = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_SERVICIO('${desc}')`);
        const servicios = rows[0];

        servicios.forEach(servicio => {
            if (servicio.fotoServicio) {
                try {
                    servicio.img64 = Buffer.from(servicio.fotoServicio).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    servicio.img64 = null;
                }
            } else {
                servicio.img64 = null;
            }
        });
        res.status(200).json({servicios: servicios})
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const crearServicio = async (req, res) => {
    const tipoServicio = req.body.tipoServicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const foto = req.body.foto;
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_SERVICIO('${tipoServicio}','${descripcion}','${precio}','${foto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error, "La reserva con estos valores ya fue tomada");
    }
};

/**
 * Esta funcion sirve para obtener los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const obtenerServicio = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_OBTENER_SERVICIO('${id}');`);
        if (respuesta.length > 0) {
            res.status(200).json(respuesta[0][0][0]);
        } else {
            res.status(404).json({ mensaje: "servicio no encontrado" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para editar los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const editarServicio = async (req, res) => {
    const tipoServicio = req.body.tipoServicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_SERVICIO('${tipoServicio}','${descripcion}','${precio}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(respuesta);
    }
};

/**
 * Esta funcion sirve para desactivar los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const desactivarServicio = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_SERVICIO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { listarServicio, buscarServicio, crearServicio, obtenerServicio, editarServicio, desactivarServicio }