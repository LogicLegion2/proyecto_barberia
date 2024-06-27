/**
 * Este es el controlador de reservas
 * @module ctr-reservas
 */
import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import dayjs from 'dayjs';
import 'dayjs/locale/es.js'; // Importa las configuraciones de idioma español
import mysql from "mysql2/promise";
config();

dayjs.locale('es'); // Establece el idioma a español

/**
 * Esta funcion sirve para mostrar todas las reservas en la vista del admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const listarReservasAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_RESERVA_ADMIN()");
        const reservas = rows[0].map(reserva => {
            const fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return {
                ...reserva,
                fecha,
                hora
            };
        })
        console.log(reservas);
        res.status(200).json({ reservas });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para mostrar todas las reservas en la vista del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const listarReservas = async (req, res) => {
    const id = req.params['id'];
    try {
        const [rows] = await pool.query(`CALL LL_VER_RESERVAS(${id})`);
        const reservas = rows[0].map(reserva => {
            const fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return {
                ...reserva,
                fecha,
                hora
            };
        });
        res.status(200).json({ reservas });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear las reservas 
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearReserva = async (req, res) => {
    const id = req.body.id;
    const barbero = req.body.barbero;
    const servicio = req.body.servicio;
    const ubicacion = req.body.ubicacion;
    const hora = req.body.hora;
    const comentario = req.body.comentario;
    const fecha = req.body.fecha;
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_RESERVA('${id}','${barbero}','${servicio}','${ubicacion}','${hora}','${comentario}','${fecha}')`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error, "La reserva con estos valores ya fue tomada");
    }
};

/**
 * Esta funcion sirve para ver el historial de las citas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const historialCita = async (req, res) => {
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
            const hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return {
                ...reserva,
                fecha,
                hora
            };
        });
        res.status(200).json({ reservas });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cancelar las reservas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const cancelarReserva = async (req, res) => {
    const id = req.body.id;
    try {
        const respuesta = await pool.query(`CALL LL_CANCELAR_CITA('${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para ver el historial de reservas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const historialReserva = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_HISTORIAL_RESERVAS()");
        const reservas = rows[0].map(reserva => {
            const fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return {
                ...reserva,
                fecha,
                hora
            };
        });
        res.status(200).json({ reservas });
    } catch (error) {
        res.status(500).json(error);
    }
};

export { listarReservasAdmin, listarReservas, crearReserva, historialCita, cancelarReserva, historialReserva}