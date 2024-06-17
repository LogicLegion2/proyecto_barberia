import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarOferta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_OFERTAS()");
        res.render("views.oferta.ejs", { ofertas: rows[0]});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarOferta = async (req, res) => {
    try {
        // Obtener el patrón de búsqueda de la consulta
        const { desc } = req.query;
        
        // Verificar si se proporcionó un patrón de búsqueda válido
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query("CALL LL_BUSCAR_OFERTA(?)", [desc]);
        res.json(rows);
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
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const obtenerOferta = async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_OBTENER_OFERTA('${id}');`);
        if (respuesta.length > 0) {
            res.json(respuesta[0][0][0]);
        } else {
            res.status(404).json({ mensaje: "Oferta no encontrada" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//Consulta de productos para los input select del formulario de editar oferta
export const obtenerProductos = async (req, res) => {
    const id = req.params.id;
    try {
        const oferta = await obtenerOferta(id);
        const productos = await pool.query(`CALL LL_VER_PRODUCTOS();`);
        if (productos.length > 0) {
            console.log(productos[0][0][0]);
            res.render("views.editar_oferta.ejs", { id: req.query.id, oferta, productos });
        } else {
            res.status(404).json({ mensaje: "Productos no encontrados" });
        }
    } catch (error) {
        throw error;
    }
}

export const editarOferta = async (req, res) => {
    const producto1 = req.body.producto1;
    const producto2 = req.body.producto2;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const id = req.params.id;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_OFERTA('${producto1}','${producto2}','${descripcion}','${precio}','${id}');`);
        res.redirect(`/ofertas/editar?id=${id}&success=true`);
    } catch (error) {
        res.redirect(`/ofertas/editar?id=${id}&error=true`);
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