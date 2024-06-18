import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarPregunta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_PREGUNTAS()");
        res.render("views.pregunta.ejs", { preguntas: rows[0] });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearPregunta = async (req, res) => {
    const { pregunta, respuesta } = req.body;

    try {
        const [result] = await pool.query("CALL LL_INSERTAR_PREGUNTA(?, ?);", [pregunta, respuesta]);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const obtenerPregunta = async (req, res) => {
    const id = req.params.id;

    try {
        const [respuesta] = await pool.query("CALL LL_OBTENER_PREGUNTA(?);", [id]);
        if (respuesta.length > 0 && respuesta[0].length > 0) {
            res.json(respuesta[0][0]);
        } else {
            res.status(404).json({ mensaje: "Pregunta no encontrada" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const editarPregunta = async (req, res) => {
    const { pregunta, respuesta, id } = req.body;

    try {
        await pool.query("CALL LL_EDITAR_PREGUNTA(?, ?, ?);", [pregunta, respuesta, id]);
        res.redirect(`/preguntas/editar?id=${id}&success=true`);
    } catch (error) {
        res.redirect(`/preguntas/editar?id=${id}&error=true`);
    }
};

export const desactivarPregunta = async (req, res) => {
    const { id } = req.body;

    try {
        const [respuesta] = await pool.query("CALL LL_DESACTIVAR_PREGUNTAS(?);", [id]);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};
