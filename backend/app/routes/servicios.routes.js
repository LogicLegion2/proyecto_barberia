
import { Router } from "express";
import { buscarServicio, crearServicio, desactivarServicio, editarServicio, listarServicio } from "../controllers/servicios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaServicios = Router();

rutaServicios.get("/listar", verificarToken, listarServicio);
rutaServicios.get("/buscar", verificarToken, buscarServicio);
rutaServicios.post("/crear", verificarToken, crearServicio);
rutaServicios.put("/editar", verificarToken, editarServicio);
rutaServicios.put("/desactivar", verificarToken, desactivarServicio);


export default rutaServicios;