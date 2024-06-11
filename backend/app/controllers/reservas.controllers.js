import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarReservasAdmin= async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_RESERVA_ADMIN()");
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const listarReservas= async (req, res) => {
    const id = req.body.id;

    try {
        const [respuesta] = await pool.query(`CALL LL_VER_RESERVAS('${id}')`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearReserva = async (req, res) => {
    const id = req.body.id;
    const barbero = req.body.barbero;
    const servicio = req.body.servicio;
    const ubicacion = req.body.ubicacion;
    const hora = req.body.hora;
    const comentario = req.body.comentario;
    const fecha = req.body.fecha;
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_RESERVA('${id}','${barbero}','${servicio}','${ubicacion}','${hora}','${comentario}','${fecha}')`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error, "La reserva con estos valores ya fue tomada");
    }
};

export const historialCita= async (req, res) => {
    const id = req.body.id;
    try {
        const [respuesta] = await pool.query(`CALL LL_VER_HISTORIAL_CITAS('${id}')`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const cancelarReserva = async (req,res) =>{
    const id = req.body.id;
    try {
        const respuesta = await pool.query(`CALL LL_CANCELAR_CITA('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const historialReserva = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_HISTORIAL_RESERVAS()");
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const verCalendario = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_VER_CALENDARIO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
     }
}
