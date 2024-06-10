import { Router } from "express";
import { crearReserva, listarReservasAdmin } from "../controllers/reservas.controllers.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/listar", listarReservasAdmin);
rutaReservaAdmin.post("/crear", crearReserva);


export default rutaReservaAdmin;