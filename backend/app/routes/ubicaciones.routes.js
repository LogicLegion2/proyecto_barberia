
import { Router } from "express";
import { buscarUbicacion, crearUbicacion, desactivarUbicacion, editarUbicacion, listarUbicacion } from "../controllers/ubicaciones.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaUbicaciones = Router();

rutaUbicaciones.get("/listar", verificarToken, listarUbicacion);
rutaUbicaciones.get("/buscar", verificarToken, buscarUbicacion);
rutaUbicaciones.post("/crear", verificarToken, crearUbicacion);
rutaUbicaciones.put("/editar", verificarToken, editarUbicacion);
rutaUbicaciones.put("/desactivar", verificarToken, desactivarUbicacion);

export default rutaUbicaciones;