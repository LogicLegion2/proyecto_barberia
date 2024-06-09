
import { Router } from "express";
import { editarUbicacion, listarUbicacion } from "../controllers/ubicaciones.controllers.js";


const rutaUbicaciones = Router();

rutaUbicaciones.get("/listar", listarUbicacion);
rutaUbicaciones.put("/editar", editarUbicacion);


export default rutaUbicaciones;