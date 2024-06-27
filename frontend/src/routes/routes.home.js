import { Router } from "express";
import { contrasena, login, registro } from "../controllers/controllers.home.js";

const rutaHome = Router();

rutaHome.get("/login", login);
rutaHome.get("/registro", registro);
rutaHome.get("/contrasena", contrasena);

export default rutaHome;