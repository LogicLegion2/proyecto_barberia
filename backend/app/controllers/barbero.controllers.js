import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarBarbero = async (req, res) => {
    try {
        const [rowsBar] = await pool.query("CALL LL_VER_BARBERO()");
        const [rowsSer] = await pool.query("CALL LL_VER_SERVICIOS()");
        const [rowsPro] = await pool.query("CALL LL_VER_PRODUCTOS()"); 
        const [rowsOfe] = await pool.query("CALL LL_VER_OFERTAS()");
        const [rowsUbi] = await pool.query("CALL LL_VER_UBICACIONES()");
        const [rowsPre] = await pool.query("CALL LL_VER_PREGUNTAS()");
        rowsBar.forEach(barbero => {
            if (barbero.foto) {
                barbero.foto = Buffer.from(barbero.foto).toString('base64');
            }
        });
        rowsSer.forEach(servicio => {
            if (servicio.fotoServicio) {
                servicio.fotoServicio = Buffer.from(servicio.fotoServicio).toString('base64');
            }
        });
        res.render("views.barbero.ejs", { barberos: rowsBar, servicios: rowsSer, productos: rowsPro, ofertas: rowsOfe, ubicaciones: rowsUbi, preguntas: rowsPre });
        res.render("views.pag_admin.ejs", { barberos: rowsBar})
    } catch (error) {
        res.status(500).json(error);
    }
};

export const listarBarberoAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_BARBERO()");
        rows.forEach(barbero => {
            if (barbero.foto) {
                barbero.foto = Buffer.from(barbero.foto).toString('base64');
            }
        });
        res.render("views.pag_admin.ejs", { barberos: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarBarbero = async (req, res) => {
    try {
        // Obtener el patrón de búsqueda de la consulta
        const { desc } = req.query;
        
        // Verificar si se proporcionó un patrón de búsqueda válido
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query("CALL LL_BUSCAR_BARBERO(?)", [desc]);
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Perfil personal del barbero en el cual visualiza su calendario 
export const verCalendario = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        res.render("views.pag_barbero.ejs", { barberos: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil personal del barbero en el cual edita su información personal 
export const perfilBarbero = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        res.render("views.perfil_barbero_editar.ejs", { barberos: rows[0][0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil del barbero desde la vista de clientes 
export const verPerfilBarbero = async (req, res) => {
    const id = req.params['id']

    try {
        const rowsBar = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        const rowsCom = await pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`);
        res.render("views.perfil_barbero.ejs", { barberos: rowsBar[0][0], comentarios:rowsCom[0]})
        console.log(rowsBar[0][0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil del barbero desde la vista de admins 
export const verPerfilBarberoAdmin = async (req, res) => {
    const id = req.params['id']

    try {
        const rowsBar = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        const rowsCom = await pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`);
        res.render("views.eliminar_coment.ejs", { barberos: rowsBar[0][0], comentarios:rowsCom[0]})
        console.log(rowsBar[0][0]);
    } catch (error) {
        res.status(500).json(error);
    }
}
