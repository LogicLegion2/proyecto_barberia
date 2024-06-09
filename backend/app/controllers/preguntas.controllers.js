import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarPregunta = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_PREGUNTAS()");
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

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