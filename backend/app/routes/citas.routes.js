import { Router } from "express";
import { cancelarCita } from "../controllers/citas.controllers.js";

const rutaCitas = Router();

rutaCitas.use("/cancelar", cancelarCita);

export default rutaCitas;