
import { Router } from "express";
import { crearServicio, editarServicio, listarServicio } from "../controllers/servicios.controllers.js";

const rutaServicios = Router();

rutaServicios.get("/listar", listarServicio);
rutaServicios.post("/crear", crearServicio);
rutaServicios.put("/editar", editarServicio);


export default rutaServicios;