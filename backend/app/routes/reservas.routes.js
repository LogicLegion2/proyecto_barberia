
import { Router } from "express";
import { listarReservasAdmin } from "../controllers/reservas.controllers.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/", listarReservasAdmin);


export default rutaReservaAdmin;