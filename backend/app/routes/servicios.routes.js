
import { Router } from "express";
import { editarServicio, listarServicio } from "../controllers/servicios.controllers.js";

const rutaServicios = Router();

rutaServicios.get("/listar", listarServicio);
rutaServicios.put("/editar", editarServicio);


export default rutaServicios;