import { createPool } from "mysql2/promise.js";

export const pool = createPool({
    host: process.env.MYSQL_HOST || "",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "",
})