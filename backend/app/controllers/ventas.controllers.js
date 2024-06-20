import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import mysql from "mysql2/promise";
config();

dayjs.locale('es');

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

export const historialCompra= async (req, res) => {
    const id = req.params['id']
    try {
        const [rows] = await pool.query(`CALL LL_VER_HISTORIAL_COMPRAS('${id}')`);
        const compras = rows[0].map(compra => {
            const fecha = new Date(compra.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            return {
                ...compra,
                fecha
            };
        });
        res.render("views.historial_compras.ejs", { compras });
    } catch (error) {
        res.status(500).json(error);
    }
};


export const verCarroCompras = async (req, res) => {
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_VER_CARRITO_COMPRAS('${id}');`);
        const productos = respuesta[0][0]
        console.log(productos);
        res.render('views.carrito.ejs', {productos});
    } catch (error) {
        res.status(500).json(error);
     }
}

export const verEntregasAdmin = async (req, res) => {
    try {
        const rows = await pool.query(`CALL LL_VER_ENTREGAS_ADMIN()`);
        res.render("views.entrega_producto.ejs", { entregas: rows[0] });
        // res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const verEntregas = async (req, res) => {
    const id = req.params['id']
    try {
        const [rows] = await pool.query(`CALL LL_VER_ENTREGAS('${id}')`);
        const entregas = rows[0].map(entrega => {
            const fecha = new Date(entrega.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            return {
                ...entrega,
                fecha
            };
        });
        res.render("views.reservas_productos.ejs", { entregas });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const verReservasProductos = async (req, res) => {
    try {
        const [rows] = await pool.query(`CALL LL_VER_RESERVAS_PRODUCTOS()`);
        res.render("views.reservas_productos.ejs", { productos:rows[0] });
    } catch (error) {
        res.status(500).json(error);
    }
};