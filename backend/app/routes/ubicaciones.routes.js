
import { Router } from "express";
import { crearUbicacion, editarUbicacion, listarUbicacion } from "../controllers/ubicaciones.controllers.js";


const rutaUbicaciones = Router();

rutaUbicaciones.get("/listar", listarUbicacion);
rutaUbicaciones.post("/crear", crearUbicacion);
rutaUbicaciones.put("/editar", editarUbicacion);

export default rutaUbicaciones;