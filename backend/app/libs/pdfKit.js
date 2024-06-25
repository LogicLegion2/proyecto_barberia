import PDFDocument from "pdfkit-table"
import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import mysql from "mysql2/promise";
config();

dayjs.locale('es');

export async function generarPDF( dataLlamada, endLlamada) {
    try {
        // Consulta a la base de datos
        const [rows] = await pool.query("CALL LL_VER_RESERVA_ADMIN_PDF()");

        // Darle formato diferente a la fecha y hora
        const reservas = rows[0].map(reserva => {
            const fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hora = reserva.hora ? reserva.hora.substring(0, 8) : '';
            return [
                reserva.ubicacion,
                fecha,
                hora,
                reserva.cliente,
                reserva.barbero
            ];
        });

        // Crea documento PDF
        const doc = new PDFDocument();

        doc.on("data", dataLlamada);
        doc.on("end", endLlamada);

        // Define el encabezado de la tabla
        const tableArray = {
            headers: ["Ubicación", "Fecha", "Hora", "Cliente", "Barbero"],
            rows: reservas
        }; 

        // Título del documento
        doc.fontSize(30).text('Reservas Clientes', { align: 'center' });
        doc.moveDown();
        // Agrega tabla al documento
        doc.table(tableArray, { columnsSize: [130, 60, 60, 110, 110] });

        // Finaliza el doc
        doc.end();
    } catch (error) {
        console.error(error);
        endLlamada(error)
    }
}

export async function generarPDFBarbero(params, dataLlamada, endLlamada) {
    const id = params['id'];
    console.log(`Id received: ${id}`);
    try {
        // Consulta a la base de datos
        const [rows] = await pool.query(`CALL LL_VER_RESERVA_BARBERO(${id})`);

        // Darle formato diferente a la fecha y hora
        const reservas = rows[0].map(reserva => {
            const fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hora = reserva.hora ? reserva.hora.substring(0, 8) : '';
            return [
                reserva.ubicacion,
                fecha,
                hora,
                reserva.cliente,
            ];
        });

        // Crea documento PDF
        const doc = new PDFDocument();

        doc.on("data", dataLlamada);
        doc.on("end", endLlamada);

        // Define el encabezado y contenido de la tabla
        const tableArray = {
            headers: ["Ubicación", "Fecha", "Hora", "Cliente"],
            rows: reservas
        }; 

        // Título del documento
        doc.fontSize(30).text('Reservas Clientes', { align: 'center' });
        doc.moveDown();
        // Agrega tabla al documento
        doc.table(tableArray, { columnsSize: [155, 90, 90, 155] });

        // Finaliza el doc
        doc.end();
    } catch (error) {
        console.error(error);
    }
}
