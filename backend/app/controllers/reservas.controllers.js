import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import mysql from "mysql2/promise";
config();

dayjs.locale('es');

export const listarReservasAdmin = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_RESERVA_ADMIN()");
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const listarReservas = async (req, res) => {
    const id = req.params['id'];
    try {
        const [rows] = await pool.query(`CALL LL_VER_RESERVAS(${id})`);
        // res.render("views.historial_citas.ejs", { reservas: rows[0] });
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

export const historialCita = async (req, res) => {
    const id = req.params['id']
    try {
        const [rows] = await pool.query(`CALL LL_VER_HISTORIAL_CITAS(${id})`);
        // Dar formato sencillo de fecha
        const reservas = rows[0].map(reserva => {
            const fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hora = reserva.hora ? reserva.hora.substring(0, 8) : '';
            return {
                ...reserva,
                fecha,
                hora
            };
        });
        res.render("views.historial_citas.ejs", { reservas });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const cancelarReserva = async (req, res) => {
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
        const [rows] = await pool.query("CALL LL_VER_HISTORIAL_RESERVAS()");
        const reservas = rows[0].map(reserva => {
            const fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hora = reserva.hora ? reserva.hora.substring(0, 8) : '';
            return {
                ...reserva,
                fecha,
                hora
            };
        });
        res.render("views.historial_reservas.ejs", { reservas });
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
