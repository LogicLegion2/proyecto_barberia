import { Router } from "express";
import { login, paginaPrincipalAdmin } from "../controllers/controllers.admins.js";

const rutaAdmin = Router();

rutaAdmin.get("/login", login);
rutaAdmin.get("/home", paginaPrincipalAdmin);


export default rutaAdmin;