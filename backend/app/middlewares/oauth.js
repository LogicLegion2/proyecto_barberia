import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { pool } from "../config/mysql.db.js";
config();

/**
 * Función de utilidad para enviar respuestas de error al cliente.
 * 
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {number} statusCode - Código de estado HTTP para la respuesta.
 * @param {string} message - Mensaje de error a enviar.
 */
const error = (req, res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

/**
 * Middleware para verificar la validez de un token JWT en las solicitudes entrantes.
 * Si el token es válido, añade el ID de usuario decodificado (`idUsuario`) al objeto de solicitud (`req`).
 * 
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de callback para pasar el control al siguiente middleware.
 */
export const verificarToken = async (req, res, next) => {
    // Obtiene el token del encabezado 'x-access-token' o de la consulta de la URL
    const token = req.headers["x-access-token"] || req.query.token;

    // Si no se proporciona un token, devuelve un error de falta de autorización
    if (!token) {
        return error(req, res, 401, "No se ha proporcionado un token");
    }

    try {
        // Consulta a la base de datos para verificar si el token está en la lista negra de tokens inválidos
        const invalidToken = await pool.query(`CALL LL_VER_TOKEN('${token}')`);

        // Si se encuentra en la lista negra, devuelve un error de token inválido
        if (invalidToken && invalidToken[0].length > 0) {
            return error(req, res, 401, "Token inválido");
        }

        // Verifica y decodifica el token utilizando la clave privada del entorno
        const decoded = jwt.verify(token, process.env.TOKEN_PRIVATEKEY);

        // Añade el ID de usuario decodificado a la solicitud para usarlo en rutas posteriores
        req.idUsuario = decoded.idUsuario;

        // Continúa con el siguiente middleware o controlador
        next();
        
    } catch (err) {
        // Maneja diferentes tipos de errores JWT:
        // - TokenExpiredError: Si el token ha expirado
        // - JsonWebTokenError: Si el token es inválido por alguna razón
        // - Otros errores: Se manejan como errores internos del servidor (HTTP 500)
        if (err.name === 'TokenExpiredError') {
            error(req, res, 401, "Token expirado");
        } else if (err.name === 'JsonWebTokenError') {
            error(req, res, 401, "Token inválido");
        } else {
            error(req, res, 500, "Ha fallado el proceso de autenticación");
        }
    }
};
