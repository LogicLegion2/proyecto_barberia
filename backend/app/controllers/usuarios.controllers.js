import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
config();

const saltRounds = 10;

// Exportar a archivo diferente de respuestas
const error = (req, res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

const success = (req, res, statusCode, data) => {
    res.status(statusCode).json(data);
};

export const listarUsuario = async (req, res) => {
    try {
        const [respuesta] = await pool.query("CALL LL_VER_USUARIOS()");
        res.json(respuesta);
    } catch (error) {
        console.error(error); // Registro del error
        res.status(500).json(error);
    }
};

export const crearUsuario = async (req, res) => {
    const { nombre, correo, contrasena, usuario, telefono, rol } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_INSERTAR_USUARIO('${nombre}','${correo}','${hashedPassword}','${usuario}','${telefono}','${contrasena}','${rol}')`);

        success(req, res, 201, { message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

export const login = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const respuesta = await pool.query(`CALL LL_LOGIN('${correo}')`);
        if (respuesta[0].length === 0) {
            error(req, res, 404, "Usuario no existe");
            return;
        }

        const usuario = respuesta[0][0];

        console.log("Datos del usuario:", usuario);
        console.log("contrasena:", contrasena);
        console.log("usuario.contrasena:", usuario.contrasena);

        const password = usuario.contrasena;

        const match = await bcrypt.compare(contrasena, password);
        if (!match) {
            error(req, res, 401, "Clave errada");
            return;
        }

        const payload = {
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            correo: usuario.correo,
            contrasena: usuario.contrasena,
            rol: usuario.rol
        };

        const token = jwt.sign(
            payload,
            process.env.TOKEN_PRIVATEKEY,
            { expiresIn: process.env.TOKEN_EXPIRES_IN }
        );

        console.log("Token generado:", token);
        success(req, res, 200, { token });

    } catch (e) {
        console.error(e); // Registro del error
        error(req, res, 500, "Error en el servidor, por favor inténtalo de nuevo más tarde");
    }
};
