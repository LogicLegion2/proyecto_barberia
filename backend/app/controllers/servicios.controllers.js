import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarServicio = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_SERVICIOS()");
        res.render("views.servicio.ejs", { servicios: rows[0] });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarServicio = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_SERVICIO('${desc}')`);
        res.render('views.servicio.ejs', {servicios: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
};


export const crearServicio = async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const foto = req.body.foto;
    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_SERVICIO('${nombre}','${descripcion}','${precio}','${foto}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error, "La reserva con estos valores ya fue tomada");
    }
};

export const obtenerServicio = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_OBTENER_SERVICIO('${id}');`);
        if (respuesta.length > 0) {
            res.json(respuesta[0][0][0]);
        } else {
            res.status(404).json({ mensaje: "servicio no encontrado" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const editarServicio = async (req, res) => {
    const tipoServicio = req.body.tipoServicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_SERVICIO('${tipoServicio}','${descripcion}','${precio}','${id}');`);
        res.redirect(`/servicios/editar?id=${id}&success=true`);
    } catch (error) {
        res.redirect(`/servicios/editar?id=${id}&error=true`);
    }
}

export const desactivarServicio = async (req, res) => {
    const tipoServicio = req.body.tipoServicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_SERVICIO('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}
