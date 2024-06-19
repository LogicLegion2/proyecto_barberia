import { pool } from "../config/mysql.db.js";
import mysql from "mysql2/promise.js"; 
import {config} from "dotenv";
import jwt from "jsonwebtoken";
config(); 

export const listarProducto = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_PRODUCTOS()"); 
        res.render("views.productos.ejs", { productos: rows[0]});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const listarProductosVendidos = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_PRODUCTOS_VENDIDOS()");
        res.render("views.prod_vendido.ejs", { productos: rows[0] });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarProducto = async (req, res) => {
    try {
        // Obtener el patrón de búsqueda de la consulta
        const { desc } = req.query;

        // Verificar si se proporcionó un patrón de búsqueda válido
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_PRODUCTO('${id}')`);
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};



export const crearProducto = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const foto = req.body.foto;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PRODUCTO('${nombre}','${descripcion}','${precio}','${cantidad}','${foto}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const obtenerProducto = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_OBTENER_PRODUCTO('${id}');`);
        if (respuesta.length > 0) {
            res.json(respuesta[0][0][0]);
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


export const editarProducto = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_PRODUCTO('${nombre}','${descripcion}','${precio}','${id}');`);
        res.redirect(`/productos/editar?id=${id}&success=true`);
    } catch (error) {
        res.redirect(`/productos/editar?id=${id}&error=true`);
    }
}

export const desactivarProducto = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_PRODUCTO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const insertarProductoVenta = async (req, res) => {
    const idProducto = req.body.idProducto;
    const idVenta = req.body.idVenta;
    const cantidad = req.body.cantidad;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PRODUCTO_VENTA('${idProducto}','${idVenta}','${cantidad}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}