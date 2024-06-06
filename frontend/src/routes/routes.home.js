import { Router } from "express";
import { login } from "../controllers/controllers.home.js";
import { paginaPrincipal } from "../controllers/controllers.home.js";

const rutaHome = Router();

// rutaHome.get("/", home);
rutaHome.get("/login", login);
rutaHome.get("/cliente", paginaPrincipal);

export default rutaHome;