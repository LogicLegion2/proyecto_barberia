
import { Router } from "express";
<<<<<<< Updated upstream:backend/app/routes/ReservasAdmin.routes.js
import { listarReservasAdmin } from "../controllers/ReservasAdmin.controllers.js";
=======
import {  listarReservas, listarReservasAdmin } from "../controllers/reservas.controllers.js";
>>>>>>> Stashed changes:backend/app/routes/reservas.routes.js

const rutaReservas = Router();

rutaReservas.get("/listarReservasAdmin", listarReservasAdmin);
rutaReservas.get("/listarReservas", listarReservas);



export default rutaReservas;