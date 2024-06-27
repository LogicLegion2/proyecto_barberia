/**
 * Este es el controlador de ofertas
 * @module ctr-ofertas
 */

import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();


/**
 * Esta funcion sirve para mostrar todos las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarOferta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_OFERTAS()");
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
        res.status(200).json({ ofertas: productos });
    } catch (error) {
        res.status(500).json(error);
    }
};


/**
 * Esta funcion sirve para buscar las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const buscarOferta = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_OFERTA('${desc}')`);
        const ofertas = rows[0];

        ofertas.forEach(oferta => {
            if (oferta.foto) {
                try {
                    oferta.img64 = Buffer.from(oferta.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    oferta.img64 = null;
                }
            } else {
                oferta.img64 = null;
            }
        });
        res.status(200).json({ ofertas: ofertas })
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearOferta = async (req, res) => {
    const producto1 = req.body.producto1;
    const producto2 = req.body.producto2;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const foto = req.body.foto;
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_OFERTA('${producto1}','${producto2}','${descripcion}','${precio}','${foto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para obtener las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const obtenerOferta = async (req, res) => {
    const id = req.params.id;

    try {
        const respuestaOferta = await pool.query(`CALL LL_OBTENER_OFERTA('${id}');`);
        const oferta = respuestaOferta[0][0][0];
        if (oferta) {
            res.status(200).json(oferta);
        } else {
            res.status(404).json({ mensaje: "Oferta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la oferta' });
    }
};

/**
 * Esta funcion sirve para editar las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const editarOferta = async (req, res) => {
    const { producto1, producto2, descripcion, precio, id } = req.body;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_OFERTA('${producto1}','${producto2}','${descripcion}','${precio}','${id}');`);
        res.status(200).json({ respuesta });
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Esta funcion sirve para desactivar las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const desactivarOferta = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_OFERTA('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export {listarOferta, buscarOferta, crearOferta, obtenerOferta, editarOferta, desactivarOferta}