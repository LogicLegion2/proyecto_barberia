import { Router } from "express";
import { login, registro } from "../controllers/controllers.home.js";

const rutaHome = Router();

rutaHome.get("/login", login);
rutaHome.get("/registro", registro);

export default rutaHome;