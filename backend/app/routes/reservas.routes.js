import { Router } from "express";
import { crearReserva, listarReservas, listarReservasAdmin } from "../controllers/reservas.controllers.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/listarReservas", listarReservas);
rutaReservaAdmin.get("/listar", listarReservasAdmin);
rutaReservaAdmin.post("/crear", crearReserva);


export default rutaReservaAdmin;