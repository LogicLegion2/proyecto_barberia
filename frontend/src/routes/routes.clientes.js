import { Router } from "express";
import { login, paginaPrincipalCliente } from "../controllers/controllers.clientes.js";

const rutaCliente = Router();

rutaCliente.get("/login", login);
rutaCliente.get("/home", paginaPrincipalCliente);

export default rutaCliente;