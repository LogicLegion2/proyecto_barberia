
import { Router } from "express";
import { listarServicio } from "../controllers/servicios.controllers.js";

const rutaServicios = Router();

rutaServicios.get("/", listarServicio);


export default rutaServicios;