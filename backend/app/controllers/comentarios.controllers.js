/**
 * Este es el controlador de barbero
 * @module ctr-comentarios
 */

import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

/**
 * Esta funcion sirve para crear comentarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearComentario = async (req, res) => {
    const idUsuario = req.body.idUsuario;
    const idBarbero = req.body.idBarbero;
    const comentario = req.body.comentario;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_COMENTARIO('${idUsuario}','${idBarbero}','${comentario}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para eliminar comentarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const eliminarComentario = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_COMENTARIO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { crearComentario, eliminarComentario}