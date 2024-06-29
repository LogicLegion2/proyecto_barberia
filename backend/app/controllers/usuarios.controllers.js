/**
 * Este es el controlador de usuarios
 * @module ctr-usuarios
 */

import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
config();

const saltRounds = 10; // Define el número de rondas de salt para el hash

/**
 * Esta funcion sirve para mostrar todos los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_USUARIOS()");
        res.status(200).json({ usuarios: rows[0] });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para buscar los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const buscarUsuario = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_USUARIO('${desc}')`);
        res.status(200).json({ usuarios: rows[0] })
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para crear los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const crearUsuario = async (req, res) => {
    const { nombre, correo, contrasena, telefono, rol, foto } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_INSERTAR_USUARIO('${nombre}','${correo}','${hashedPassword}','${telefono}','${rol}','${foto}')`);

        res.status(200).json({ message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

/**
 * Esta funcion sirve para crear los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const crearBarbero = async (req, res) => {
    const { nombre, correo, contrasena, telefono, descripcion, fotoPerfil } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_INSERTAR_BARBERO('${nombre}','${correo}','${hashedPassword}','${telefono}','${descripcion}','${fotoPerfil}')`);

        res.status(200).json({ message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

/**
 * Esta funcion sirve para registrar los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const registroUsuario = async (req, res) => {
    const { nombre, correo, contrasena, telefono } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_REGISTRO_CLIENTE('${nombre}','${correo}','${hashedPassword}','${telefono}')`);

        res.status(200).json({ message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

/**
 * Esta funcion sirve para loguearse
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ error: true, message: "El correo y la contraseña son requeridos" });
    }

    try {
        const respuesta = await pool.query(`CALL LL_LOGIN('${correo}')`);
        if (respuesta[0][0].length === 0) {
            return res.status(400).json({ error: true, message: "El usuario ingresado no existe" });
        }

        const usuario = respuesta[0][0][0];
        const password = usuario.contrasena;
        const match = await bcrypt.compare(contrasena, password);
        if (!match) {
            return res.status(400).json({ error: true, message: "Contraseña incorrecta" });
        }

        let idUsuario = usuario.idUsuario;
        const rol = usuario.rol;

        if (rol === "barbero") {
            const respuestaBar = await pool.query(`CALL LL_OBTENER_BARBERO('${idUsuario}')`);
            if (respuestaBar[0][0].length === 0) {
                return res.status(400).json({ error: true, message: "El barbero no existe" });
            }
            const barbero = respuestaBar[0][0][0];
            idUsuario = barbero.id;
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

        // const rol = usuario.rol
        // const id = usuario.idUsuario

        // if (usuario.rol === "barbero") {
        //     const respuestaBar = await pool.query(`CALL LL_OBTENER_BARBERO('${id}')`);
        //     const barbero = respuestaBar[0][0][0];
        //     id = barbero.id;
        //     console.log(id);
        // }

        res.status(200).json({ error: false, token, id: idUsuario, rol });
    } catch (e) {
        res.status(500).json({ error: true, message: "Error interno del servidor" });
    }
};

/**
 * Esta funcion sirve para cambiar el nombre del usuario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarNombre = async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_NOMBRE_USUARIO('${id}','${nombre}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar el telefono del usuario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarTelefono = async (req, res) => {
    const id = req.body.id;
    const telefono = req.body.telefono;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_TELEFONO_USUARIO('${id}','${telefono}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * Esta funcion sirve para cambiar el correo del usuario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarCorreo = async (req, res) => {
    const id = req.body.id;
    const correo = req.body.correo;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_CORREO_USUARIO('${id}','${correo}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar la foto de perfil
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarFoto = async (req, res) => {
    const id = req.body.id;
    const foto = req.body.foto;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_FOTO_PERFIL('${id}','${foto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar la contraseña del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarContrasena = async (req, res) => {
    const id = req.body.id;
    const contrasena = req.body.contrasena;
    const contrasenaNueva = req.body.contrasenaNueva;

    try {
        const respuesta = await pool.query(`CALL LL_VER_PERFIL_CLIENTE('${id}')`);
        const usuario = respuesta[0][0][0];
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        const hashedPassword = await bcrypt.hash(contrasenaNueva, saltRounds);
        const respuestaFinal = await pool.query(`CALL LL_EDITAR_CONTRASENA_USUARIO('${id}','${hashedPassword}')`);
        res.status(200).json({ respuestaFinal });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar el nombre de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarNombreBarbero = async (req, res) => { // Edición de perfiles para barberos
    const id = req.body.id;
    const nombre = req.body.nombre;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_NOMBRE_BARBERO('${id}','${nombre}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar el telefono de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarTelefonoBarbero = async (req, res) => {
    const id = req.body.id;
    const telefono = req.body.telefono;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_TELEFONO_BARBERO('${id}','${telefono}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar el correo de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarCorreoBarbero = async (req, res) => {
    const id = req.body.id;
    const correo = req.body.correo;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_CORREO_BARBERO('${id}','${correo}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar la foto de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarFotoBarbero = async (req, res) => {
    const id = req.body.id;
    const foto = req.body.foto;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_FOTO_PERFIL_BARBERO('${id}','${foto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar la descripcion de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarDescripcionBarbero = async (req, res) => {
    const id = req.body.id;
    const descripcion = req.body.descripcion;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_DESCRIPCION_BARBERO('${id}','${descripcion}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para cambiar la contraseña de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cambiarContrasenaBarbero = async (req, res) => {
    const id = req.body.id;
    const contrasena = req.body.contrasena;
    const contrasenaNueva = req.body.contrasenaNueva;

    try {
        const respuesta = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}')`);
        const usuario = respuesta[0][0][0];
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        const hashedPassword = await bcrypt.hash(contrasenaNueva, saltRounds);
        const respuestaFinal = await pool.query(`CALL LL_EDITAR_CONTRASENA_BARBERO('${id}','${hashedPassword}')`);
        res.status(200).json({ respuestaFinal });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para desactivar los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const desactivarUsuario = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_USUARIO('${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para ver el perfil del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const verPerfil = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_CLIENTE('${id}');`);
        const clientes = rows[0][0];

        clientes.forEach(cliente => {
            if (cliente.foto) {
                try {
                    cliente.img64 = Buffer.from(cliente.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    cliente.img64 = null;
                }
            } else {
                cliente.img64 = null;
            }
        });
        res.status(200).json({ clientes: clientes })
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * Esta funcion sirve para ver el perfil del admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const verPerfilAdmin = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_CLIENTE('${id}');`);
        const admins = rows[0][0];

        admins.forEach(admin => {
            if (admin.foto) {
                try {
                    admin.img64 = Buffer.from(admin.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    admin.img64 = null;
                }
            } else {
                admin.img64 = null;
            }
        });
        res.status(200).json({ admins: admins })
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * Esta funcion sirve para obtener un token de acceso
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const logout = async (req, res) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.json("No se ha proporcionado un token");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_PRIVATEKEY);
        // Almacena el token inválido en la base de datos
        const respuesta = await pool.query('INSERT INTO tokensinvalidos (token, expiracion) VALUES (?, ?)', [token, new Date()]);

        res.status(200).json({ respuesta });
    } catch (err) {
        res.status(500).json(err);
    }
};

export { listarUsuario, buscarUsuario, crearUsuario, crearBarbero, registroUsuario, login, cambiarNombre, cambiarTelefono, cambiarCorreo, cambiarFoto, cambiarContrasena, cambiarNombreBarbero, cambiarTelefonoBarbero, cambiarCorreoBarbero, cambiarFotoBarbero, cambiarDescripcionBarbero, cambiarContrasenaBarbero, desactivarUsuario, verPerfil, verPerfilAdmin, logout }