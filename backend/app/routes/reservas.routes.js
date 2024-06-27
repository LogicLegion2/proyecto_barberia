import { Router } from "express";
import { cancelarReserva, crearReserva, historialCita, historialReserva, listarReservas, listarReservasAdmin } from "../controllers/reservas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";
import { generarPDF, generarPDFBarbero } from "../libs/pdfKit.js";

/**
 * Estas son las rutas del backend de reservas para gestionar las operaciones relacionadas con las reservas
 * @type {object}
 */
const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/admin", listarReservasAdmin);
rutaReservaAdmin.get("/listar/:id", listarReservas);
rutaReservaAdmin.get("/historial/:id", historialCita);
rutaReservaAdmin.get("/historial/", historialReserva);
rutaReservaAdmin.post("/crear", crearReserva);
rutaReservaAdmin.post("/cancelar", cancelarReserva);

rutaReservaAdmin.get("/pdf", (req, res) => {

 // Configuración de cabeceras de respuesta para el PDF generado
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename = Reservas.pdf"
    })
// Genera y envía el PDF utilizando la función generarPDF
    generarPDF(
        (data) => stream.write(data), // Función de callback para escribir datos en el stream de respuesta
        () => stream.end()            // Función de callback para finalizar el stream de respuesta
);
});
// Ruta para generar PDF de reservas de un barbero específico
rutaReservaAdmin.get("/pdf/barbero/:id", (req, res) => {
    const id = req.params['id'];
    
    // Configura las cabeceras de respuesta para el PDF generado
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Reservas.pdf");

    // Genera y envía el PDF utilizando la función generarPDFBarbero
    generarPDFBarbero(
        { id },                      // Parámetros para la generación del PDF (en este caso, el ID del barbero)
        (chunk) => res.write(chunk, 'binary'), // Función de callback para escribir datos en el stream de respuesta
        () => res.end()              // Función de callback para finalizar el stream de respuesta
    );
});

export default rutaReservaAdmin;