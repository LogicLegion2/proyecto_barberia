import { createPool } from "mysql2/promise";
import {config} from "dotenv"
config();

/**
 * Pool de conexión a mi base de datos MySQL.
 * @type {object}
 */
export const pool = createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})