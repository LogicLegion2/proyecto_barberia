import { Router } from "express";
import { cancelarReserva, crearReserva, historialCita, historialReserva, listarReservas, listarReservasAdmin } from "../controllers/reservas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/listar/admin", listarReservasAdmin);
rutaReservaAdmin.get("/listar/:id", listarReservas);
rutaReservaAdmin.get("/historial/cita/:id", historialCita);
rutaReservaAdmin.get("/historial/reserva", historialReserva);
rutaReservaAdmin.post("/crear", verificarToken, crearReserva);
rutaReservaAdmin.put("/cancelar", verificarToken, cancelarReserva);

export default rutaReservaAdmin;