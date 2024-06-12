import { Router } from "express";
import rutaHome from "./routes.home.js";

const ruta = Router();

ruta.use("/", rutaHome);

export default ruta;