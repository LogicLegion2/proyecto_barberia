import { Router } from "express";
import { cancelarReserva, crearReserva, historialCita, historialReserva, listarReservas, listarReservasAdmin, verCalendario } from "../controllers/reservas.controllers.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/listar/admin", listarReservasAdmin);
rutaReservaAdmin.get("/listar", listarReservas);
rutaReservaAdmin.get("/historial/cita", historialCita);
rutaReservaAdmin.get("/historial/reserva", historialReserva);
rutaReservaAdmin.post("/crear", crearReserva);
rutaReservaAdmin.put("/cancelar", cancelarReserva);
rutaReservaAdmin.get("/ver", verCalendario);

export default rutaReservaAdmin;