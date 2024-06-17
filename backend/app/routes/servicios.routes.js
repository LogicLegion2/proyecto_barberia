
import { Router } from "express";
import { buscarServicio, crearServicio, desactivarServicio, editarServicio, listarServicio, obtenerServicio } from "../controllers/servicios.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaServicios = Router();

rutaServicios.get("/listar", listarServicio);
rutaServicios.get("/buscar", buscarServicio);
rutaServicios.post("/crear", crearServicio);
rutaServicios.get("/obtener/:id", obtenerServicio);
rutaServicios.get("/editar", (req, res) => {
    res.render("views.editar_servicio.ejs", { id: req.query.id });
});
rutaServicios.post("/editar", editarServicio);
rutaServicios.put("/desactivar", desactivarServicio);


export default rutaServicios;