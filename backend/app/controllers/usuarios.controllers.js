import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
config();

const saltRounds = 10;

export const listarUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_USUARIOS()");
        res.status(200).json({ usuarios: rows[0] });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscarUsuario = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_USUARIO('${desc}')`);
        res.status(200).json({usuarios: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearUsuario = async (req, res) => {
    const { nombre, correo, contrasena, telefono, rol, foto } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_INSERTAR_USUARIO('${nombre}','${correo}','${hashedPassword}','${telefono}','${rol}','${foto}')`);

        res.status(200).json({ message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

export const crearBarbero = async (req, res) => {
    const { nombre, correo, contrasena, telefono, descripcion, rol } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const resultado = await pool.query(`CALL LL_INSERTAR_BARBERO('${nombre}','${correo}','${hashedPassword}','${telefono}','${descripcion}','${rol}')`);

        res.status(200).json({ message: "Usuario creado con éxito", id: resultado.insertId });
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

        res.status(200).json({ message: "Usuario creado con éxito", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor, por favor inténtalo de nuevo más tarde" });
    }
};

export const login = async (req, res) => {
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
        console.log({"TOKEN":token});
        res.status(200).json({ error: false, token });
    } catch (e) {
        res.status(500).json({ error: true, message: "Error interno del servidor" });
    }
};

export const cambiarNombre = async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_NOMBRE_USUARIO('${id}','${nombre}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarTelefono = async (req, res) => {
    const id = req.body.id;
    const telefono = req.body.telefono;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_TELEFONO_USUARIO('${id}','${telefono}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarCorreo = async (req, res) => {
    const id = req.body.id;
    const correo = req.body.correo;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_CORREO_USUARIO('${id}','${correo}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarFoto = async (req, res) => {
    const id = req.body.id;
    const foto = req.body.foto;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_FOTO_PERFIL('${id}','${foto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarContrasena = async (req, res) => {
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

// Edición de perfiles para barberos
export const cambiarNombreBarbero = async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_NOMBRE_BARBERO('${id}','${nombre}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarTelefonoBarbero = async (req, res) => {
    const id = req.body.id;
    const telefono = req.body.telefono;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_TELEFONO_BARBERO('${id}','${telefono}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarCorreoBarbero = async (req, res) => {
    const id = req.body.id;
    const correo = req.body.correo;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_CORREO_BARBERO('${id}','${correo}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarFotoBarbero = async (req, res) => {
    const id = req.body.id;
    const foto = req.body.foto;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_FOTO_PERFIL_BARBERO('${id}','${foto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarDescripcionBarbero = async (req, res) => {
    const id = req.body.id;
    const descripcion = req.body.descripcion;

    try {
        const respuesta = await pool.query(`CALL LL_EDITAR_DESCRIPCION_BARBERO('${id}','${descripcion}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const cambiarContrasenaBarbero = async (req, res) => {
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

export const desactivarUsuario = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_USUARIO('${id}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const verPerfil = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_CLIENTE('${id}');`);
        res.status(200).json({ clientes: rows[0][0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

export const verPerfilAdmin = async (req, res) => {
    const id = req.params['idUser']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_CLIENTE('${id}');`);
        res.status(200).json({ admins: rows[0][0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

export const logout = async (req, res) => {
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