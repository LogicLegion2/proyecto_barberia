
import { Router } from "express";
import { buscarUbicacion, crearUbicacion, desactivarUbicacion, editarUbicacion, listarUbicacion } from "../controllers/ubicaciones.controllers.js";


const rutaUbicaciones = Router();

rutaUbicaciones.get("/listar", listarUbicacion);
rutaUbicaciones.get("/buscar", buscarUbicacion);
rutaUbicaciones.post("/crear", crearUbicacion);
rutaUbicaciones.put("/editar", editarUbicacion);
rutaUbicaciones.put("/desactivar", desactivarUbicacion);

export default rutaUbicaciones;