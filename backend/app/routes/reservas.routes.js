import { Router } from "express";
import { cancelarReserva, crearReserva, historialCita, historialReserva, listarReservas, listarReservasAdmin } from "../controllers/reservas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";
import { generarPDF } from "../libs/pdfKit.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/admin", listarReservasAdmin);
rutaReservaAdmin.get("/:id", listarReservas);
rutaReservaAdmin.get("/historial/:id", historialCita);
rutaReservaAdmin.get("/historial/", verificarToken, historialReserva);
rutaReservaAdmin.post("/crear", crearReserva);
rutaReservaAdmin.post("/cancelar", cancelarReserva);
rutaReservaAdmin.get("/pdf", (req, res) => {

    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename = Reservas.pdf"
    })

    generarPDF(
        (data) => stream.write(data),
        () => stream.end()
    );
})
// rutaReservaAdmin.get("/pdf/barbero", (req, res) => {
//     const id = req.query.id;
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=Reservas.pdf");
//     generarPDFBarbero({id}, (chunk) => {
//         res.write(chunk, 'binary');
//     }, () => { 
//       res.end();
//     });
// })

export default rutaReservaAdmin;