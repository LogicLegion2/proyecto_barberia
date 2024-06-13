import { Router } from "express";
import { cancelarReserva, crearReserva, historialCita, historialReserva, listarReservas, listarReservasAdmin, verCalendario } from "../controllers/reservas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/listar/admin", verificarToken, listarReservasAdmin);
rutaReservaAdmin.get("/listar", verificarToken, listarReservas);
rutaReservaAdmin.get("/historial/cita/:id", historialCita);
rutaReservaAdmin.get("/historial/reserva", historialReserva);
rutaReservaAdmin.post("/crear", verificarToken, crearReserva);
rutaReservaAdmin.put("/cancelar", verificarToken, cancelarReserva);
rutaReservaAdmin.get("/ver", verificarToken, verCalendario);

export default rutaReservaAdmin;