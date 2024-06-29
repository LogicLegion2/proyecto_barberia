/**
 * Este es el controlador de preguntas
 * @module ctr-preguntas
 */

import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

/**
 * Esta funcion sirve para mostrar todas las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const listarPregunta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_PREGUNTAS()");
        res.status(200).json({ preguntas: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para buscar las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const buscarPregunta = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_PREGUNTA('${desc}')`);
        res.status(200).json({preguntas: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearPregunta = async (req, res) => {
    const { pregunta, respuesta } = req.body;

    try {
        const dbrespuesta = await pool.query(`CALL LL_INSERTAR_PREGUNTA('${pregunta}','${respuesta}');`);
        res.status(200).json(dbrespuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para obtener las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const obtenerPregunta = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_OBTENER_PREGUNTA('${id}');`);
        if (respuesta.length > 0) {
            res.status(200).json(respuesta[0][0][0]);
        } else {
            res.status(404).json({ mensaje: "Pregunta no encontrada" });
        }
    } catch (error) {
        console.error('Error obteniendo pregunta:', error);
        res.status(500).json({ error: 'Error al obtener la pregunta' });
    }
};

/**
 * Esta funcion sirve para editar las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const editarPregunta = async (req, res) => {
    const { pregunta, resp, id } = req.body;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_PREGUNTA('${pregunta}', '${resp}', '${id}');`);
        res.status(200).json({ mensaje: 'Pregunta editada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para desactivar las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const desactivarPregunta = async (req, res) => {
    const id = req.body.id;

    try {
        const [respuesta] = await pool.query(`CALL LL_DESACTIVAR_PREGUNTAS('${id}')`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export {listarPregunta, buscarPregunta, crearPregunta, obtenerPregunta, editarPregunta, desactivarPregunta}