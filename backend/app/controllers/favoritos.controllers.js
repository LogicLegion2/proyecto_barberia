import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarFavoritos = async (req, res) => {
    const id = req.params['id']
    try {

        const [
            [rowsBar],[rowsPro],[rowsOfe],[rowsSer]
        ] = await Promise.all([
            await pool.query(`CALL LL_VER_BARBERO_FAVORITO('${id}');`),
            await pool.query(`CALL LL_VER_PRODUCTO_FAVORITO('${id}');`),
            await pool.query(`CALL LL_VER_OFERTA_FAVORITO('${id}');`),
            await pool.query(`CALL LL_VER_SERVICIO_FAVORITO('${id}');`)
        ])
        // Se adecua favoritos para que no muestre error si no encuentra informacion en alguna consulta
        const favoritos = {
            barbero: rowsBar[0] || [],
            producto: rowsPro[0] || [],
            oferta: rowsOfe[0] || [],
            servicio: rowsSer[0] || []
        };
        console.log(favoritos);
        res.status(200).json({ favoritos });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearBarberoFavorito = async (req, res) => {
    const barbero = req.body.barbero;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_BARBERO_FAVORITO('${barbero}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const crearProductoFavorito = async (req, res) => {
    const producto = req.body.producto;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PRODUCTO_FAVORITO('${producto}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const crearOfertaFavorito = async (req, res) => {
    const oferta = req.body.oferta;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_OFERTA_FAVORITO('${oferta}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const crearServicioFavorito = async (req, res) => {
    const servicio = req.body.servicio;
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_SERVICIO_FAVORITO('${servicio}','${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}