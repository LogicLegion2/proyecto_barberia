import { Router } from "express";
import { cancelarCita, listarCita } from "../controllers/citas.controllers.js";


const rutaCitas = Router();

rutaCitas.use("/listar", listarCita);
rutaCitas.use("/cancelar", cancelarCita);

export default rutaCitas;