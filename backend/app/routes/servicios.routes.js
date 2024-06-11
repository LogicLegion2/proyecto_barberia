
import { Router } from "express";
import { buscarServicio, crearServicio, editarServicio, listarServicio } from "../controllers/servicios.controllers.js";

const rutaServicios = Router();

rutaServicios.get("/listar", listarServicio);
rutaServicios.get("/buscar", buscarServicio);
rutaServicios.post("/crear", crearServicio);
rutaServicios.put("/editar", editarServicio);


export default rutaServicios;