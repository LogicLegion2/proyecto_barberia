import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarOferta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_OFERTAS()");
        res.status(200).json({ ofertas: rows[0] });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarOferta = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_OFERTA('${desc}')`);
        res.status(200).json({ ofertas: rows[0] })
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearOferta = async (req, res) => {
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

export const obtenerOferta = async (req, res) => {
    const id = req.params.id;

    try {
        const respuestaOferta = await pool.query(`CALL LL_OBTENER_OFERTA('${id}');`);
        const oferta = respuestaOferta[0][0];
        console.log(oferta);
        const respuestaProductos = await pool.query(`CALL LL_VER_PRODUCTOS();`);
        const productos = respuestaProductos[0][0];
        console.log(productos);
        if (oferta && productos.length > 0) {
            res.status(200).json({ id, oferta, productos });
        } else {
            res.status(404).json({ mensaje: "Oferta o productos no encontrados" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const editarOferta = async (req, res) => {
    const producto1 = req.body.producto1;
    const producto2 = req.body.producto2;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_OFERTA('${producto1}','${producto2}','${descripcion}','${precio}','${id}');`);
        res.status(200).json({respuesta});
    } catch (error) {
        res.status(500).json({respuesta});
    }
}

export const desactivarOferta = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_OFERTA('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}