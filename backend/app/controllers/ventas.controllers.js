import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const crearPago = async (req, res) => {
    const id = req.body.id;
    const metodoPago = req.body.metodoPago;
    const precio = req.body.precio;
    const metodoEntrega = req.body.metodoEntrega;
    const direccion = req.body.direccion;

    if (direccion == null) {
        direccion == "";
    }
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_VENTA('${id}','${metodoPago}','${precio}','${metodoEntrega}','${direccion}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearReembolso = async (req, res) => {
    const idUsuario = req.body.idUsuario;
    const idVenta = req.body.idVenta;

    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_REEMBOLSO('${idUsuario}','${idVenta}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};