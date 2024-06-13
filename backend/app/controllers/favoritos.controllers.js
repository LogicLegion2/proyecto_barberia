import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarFavoritos = async (req, res) => {
    const id = req.params['id']

    try {
        const [rowsBar] = await pool.query(`CALL LL_VER_BARBERO_FAVORITO('${id}')`);
        const [rowsPro] = await pool.query(`CALL LL_VER_PRODUCTO_FAVORITO('${id}')`);
        const [rowsOfe] = await pool.query(`CALL LL_VER_OFERTA_FAVORITO('${id}')`);
        const [rowsSer] = await pool.query(`CALL LL_VER_SERVICIO_FAVORITO('${id}')`);
        const favoritos = {
            barbero: rowsBar[0] || [],
            producto: rowsPro[0] || [],
            oferta: rowsOfe[0] || [],
            servicio: rowsSer[0] || []
        };
        console.log(favoritos);
        res.render("views.lista_fav.ejs", { favoritos });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearBarberoFavorito = async (req, res) => {
    const barbero = req.body.barbero;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_BARBERO_FAVORITO('${barbero}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const crearProductoFavorito = async (req, res) => {
    const producto = req.body.producto;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PRODUCTO_FAVORITO('${producto}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const crearOfertaFavorito = async (req, res) => {
    const oferta = req.body.oferta;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_OFERTA_FAVORITO('${oferta}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const crearServicioFavorito = async (req, res) => {
    const servicio = req.body.servicio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_SERVICIO_FAVORITO('${servicio}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}