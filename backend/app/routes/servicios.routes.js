
import { Router } from "express";
import { listarServicio } from "../controllers/servicios.controllers.js";

const rutaservicios = Router();

rutaservicios.get("/", listarServicio);


export default rutaservicios;