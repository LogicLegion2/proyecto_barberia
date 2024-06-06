
import { Router } from "express";
import { listarservicio } from "../controllers/servicios.controllers.js";

const rutaservicios = Router();

rutaservicios.get("/", listarservicio);


export default rutaservicios;