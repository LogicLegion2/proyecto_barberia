/**
 * Este es el controlador de favoritos
 * @module ctr-favoritos
 */

import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();


/**
 * Esta funcion sirve para mostrar todos los favoritos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarFavoritos = async (req, res) => {
    const id = req.params['id'];
    try {
        const [
            [rowsBar], [rowsPro], [rowsOfe], [rowsSer]
        ] = await Promise.all([
            pool.query(`CALL LL_VER_BARBERO_FAVORITO('${id}');`),
            pool.query(`CALL LL_VER_PRODUCTO_FAVORITO('${id}');`),
            pool.query(`CALL LL_VER_OFERTA_FAVORITO('${id}');`),
            pool.query(`CALL LL_VER_SERVICIO_FAVORITO('${id}');`)
        ]);

        const barberos = rowsBar[0] || [];
        const servicios = rowsSer[0] || [];
        const productos = rowsPro[0] || [];
        const ofertas = rowsOfe[0] || [];

        console.log(barberos);
        barberos.forEach(barbero => {
            barbero.img64 = null;
            if (barbero.foto) {
                try {
                    barbero.img64 = Buffer.from(barbero.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                }
            }
        });

        servicios.forEach(servicio => {
            servicio.img64 = null;
            if (servicio.foto) {
                try {
                    servicio.img64 = Buffer.from(servicio.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                }
            }
        });

        productos.forEach(producto => {
            producto.img64 = null;
            if (producto.foto) {
                try {
                    producto.img64 = Buffer.from(producto.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                }
            }
        });

        ofertas.forEach(oferta => {
            oferta.img64 = null;
            if (oferta.foto) {
                try {
                    oferta.img64 = Buffer.from(oferta.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                }
            }
        });

        const favoritos = {
            barbero: barberos,
            producto: productos,
            oferta: ofertas,
            servicio: servicios
        };
        res.status(200).json({ favoritos });
    } catch (error) {
        console.error('Error en listarFavoritos:', error);
        res.status(500).json({ error: 'Error al listar favoritos' });
    }
};

/**
 * Esta funcion sirve para crear barbero favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearBarberoFavorito = async (req, res) => {
    const barbero = req.body.barbero;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_BARBERO_FAVORITO('${barbero}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear producto favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearProductoFavorito = async (req, res) => {
    const producto = req.body.producto;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PRODUCTO_FAVORITO('${producto}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear oferta favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearOfertaFavorito = async (req, res) => {
    const oferta = req.body.oferta;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_OFERTA_FAVORITO('${oferta}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear servicio favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const crearServicioFavorito = async (req, res) => {
    const servicio = req.body.servicio;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_SERVICIO_FAVORITO('${servicio}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export {listarFavoritos, crearBarberoFavorito, crearProductoFavorito, crearOfertaFavorito, crearServicioFavorito }