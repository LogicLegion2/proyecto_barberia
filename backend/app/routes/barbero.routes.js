
import { Router } from "express";
import { listarBarbero } from "../controllers/barbero.controllers.js";

const rutabarberos = Router();

rutabarberos.get("/", listarBarbero);


export default rutabarberos;