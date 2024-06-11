import { Router } from "express";
import { crearReserva, listarReservas, listarReservasAdmin } from "../controllers/reservas.controllers.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/listar", listarReservasAdmin);
rutaReservaAdmin.get("/listar/admin", listarReservasAdmin);
rutaReservaAdmin.get("/listar", listarReservas);
rutaReservaAdmin.post("/crear", crearReserva);

export default rutaReservaAdmin;