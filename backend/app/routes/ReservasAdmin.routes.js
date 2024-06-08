
import { Router } from "express";
import { listarReservasAdmin } from "../controllers/ReservasAdmin.controllers.js";

const rutaReservaAdmin = Router();

rutaReservaAdmin.get("/", listarReservasAdmin);


export default rutaReservaAdmin;