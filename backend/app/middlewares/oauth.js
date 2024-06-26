import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { pool } from "../config/mysql.db.js";
config();

const error = (req, res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

export const verificarToken = async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.query.token;

    if (!token) {
        return error(req, res, 401, "No se ha proporcionado un token");
    }

    try {
        const invalidToken = await pool.query(`CALL LL_VER_TOKEN('${token}')`);

        if (invalidToken && invalidToken[0].length > 0) {
            return error(req, res, 401, "Token invalido");
        }

        const decoded = jwt.verify(token, process.env.TOKEN_PRIVATEKEY);
        req.idUsuario = decoded.idUsuario; 
        next();
        
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            error(req, res, 401, "Token expirado");
        } else if (err.name === 'JsonWebTokenError') {
            error(req, res, 401, "Token invalido");
        } else {
            error(req, res, 500, "Ha fallado el proceso de autenticación");
        }
    }
};
