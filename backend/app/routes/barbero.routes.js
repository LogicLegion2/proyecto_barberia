
import { Router } from "express";
import { listarbarbero } from "../controllers/barbero.controllers.js";

const rutabarberos = Router();

rutabarberos.get("/", listarbarbero);


export default rutabarberos;