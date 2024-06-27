/**
 * Este es el controlador de productos
 * @module ctr-productos
 */

import { pool } from "../config/mysql.db.js";
import mysql from "mysql2/promise.js"; 
import {config} from "dotenv";
import jwt from "jsonwebtoken";
config(); 

/**
 * Esta funcion sirve para mostrar todos los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarProducto = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_PRODUCTOS()"); 
        const productos = rows[0];

        productos.forEach(producto => {
            if (producto.foto) {
                try {
                    producto.img64 = Buffer.from(producto.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    producto.img64 = null;
                }
            } else {
                producto.img64 = null;
            }
        });
        res.status(200).json({ productos: productos});
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para mostrar todos los productos vendidos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarProductosVendidos = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_PRODUCTOS_VENDIDOS()");
        const productos = rows[0];

        productos.forEach(producto => {
            if (producto.foto) {
                try {
                    producto.img64 = Buffer.from(producto.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    producto.img64 = null;
                }
            } else {
                producto.img64 = null;
            }
        });
        res.status(200).json({ productos: productos });
    } catch (error) {
        res.status(500).json(error);
    }
};


/**
 * Esta funcion sirve para buscar los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const buscarProducto = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_PRODUCTO('${desc}')`)
        const productos = rows[0];

        productos.forEach(producto => {
            if (producto.foto) {
                try {
                    producto.img64 = Buffer.from(producto.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    producto.img64 = null;
                }
            } else {
                producto.img64 = null;
            }
        });;
        res.status(200).json({productos: productos})
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearProducto = async (req, res) => {
    const input = req.body;
    const {
        nombre,
        descripcion,
        precio,
        cantidad,
        foto
    } = input

    try {
        const respuesta = await pool.query("CALL LL_INSERTAR_PRODUCTO(?,?,?,?,?);", [nombre, descripcion, precio, cantidad, foto]);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para obtener los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const obtenerProducto = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_OBTENER_PRODUCTO('${id}');`);
        if (respuesta.length > 0) {
            res.status(200).json(respuesta[0][0][0]);
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para editar los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const editarProducto = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_PRODUCTO('${nombre}','${descripcion}','${precio}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(respuesta);
    }
};

/**
 * Esta funcion sirve para desactivar los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const desactivarProducto = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_PRODUCTO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para insertar los productos a la venta
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const insertarProductoVenta = async (req, res) => {
    const idProducto = req.body.idProducto;
    const idVenta = req.body.idVenta;
    const cantidad = req.body.cantidad;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PRODUCTO_VENTA('${idProducto}','${idVenta}','${cantidad}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export {listarProducto, listarProductosVendidos, buscarProducto, crearProducto, obtenerProducto, editarProducto, desactivarProducto, insertarProductoVenta}