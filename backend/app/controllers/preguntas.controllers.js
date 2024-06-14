import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarPregunta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_PREGUNTAS()");
        res.render("views.pregunta.ejs", { preguntas: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearPregunta = async (req, res) => {
    const pregunta = req.body.pregunta;
    const resp = req.body.resp;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PREGUNTA('${pregunta}','${resp}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const editarPregunta = async (req, res) => {
    const pregunta = req.body.pregunta;
    const resp = req.body.respuesta;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_PREGUNTA('${pregunta}','${resp}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const desactivarPregunta = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_PREGUNTAS('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}