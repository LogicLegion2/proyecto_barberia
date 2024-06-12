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
        res.status(500).json(error);
    }
};

export const crearUsuario = async (req, res) => {
    const { nombre, correo, contrasena, telefono, rol, foto } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_INSERTAR_USUARIO('${nombre}','${correo}','${hashedPassword}','${telefono}','${rol}','${foto}')`);

        success(req, res, 201, { message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

export const crearBarbero = async (req, res) => {
    const { nombre, correo, contrasena, telefono, descripcion, rol } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_INSERTAR_BARBERO('${nombre}','${correo}','${hashedPassword}','${telefono}','${descripcion}','${rol}')`);

        success(req, res, 201, { message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

export const registroUsuario = async (req, res) => {
    const { nombre, correo, contrasena, telefono } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_REGISTRO_CLIENTE('${nombre}','${correo}','${hashedPassword}','${telefono}')`);

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

        const usuario = respuesta[0][0][0];

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

export const cambiarContrasena = async (req, res) => {
    const id = req.body.id;
    const contrasena = req.body.contrasena;
    const contrasenaNueva = req.body.contrasenaNueva;

    try {
        const respuesta = await pool.query(`CALL LL_VERIFICAR_CONTRASENA('${id}','${contrasena}');`);

        const usuario = respuesta[0][0];
        console.log("Datos del usuario:", usuario);
        try {
            const respuesta2 = await pool.query(`CALL LL_EDITAR_CONTRASENA_USUARIO('${id}','${contrasenaNueva}');`);
            res.json(respuesta2);
        } catch (e) {
            res.status(500).json(e);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarNombre = async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_NOMBRE_USUARIO('${id}','${nombre}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarTelefono = async (req, res) => {
    const id = req.body.id;
    const telefono = req.body.telefono;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_TELEFONO_USUARIO('${id}','${telefono}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarCorreo = async (req, res) => {
    const id = req.body.id;
    const correo = req.body.correo;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_CORREO_USUARIO('${id}','${correo}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const verPerfil = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_VER_PERFIL_CLIENTE('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const logout = async (req, res) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return error(req, res, 401, "El token no ha sido porporcionado");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_PRIVATEKEY);
        // Almacenar el token inválido en la base de datos
        await pool.query('INSERT INTO tokensinvalidos (token, expiracion) VALUES (?, ?)', [token, new Date()]);

        success(req, res, 200, { message: "Finalizó sesión exitosamente" });
    } catch (err) {
        error(req, res, 500, "Fallo el cerrar sesión");
    }
};
