import { Router } from "express";
import { crearPregunta, desactivarPregunta, editarPregunta, listarPregunta, obtenerPregunta } from "../controllers/preguntas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

const rutaPreguntas = Router();

rutaPreguntas.get("/traer", (req, res) => {
    res.render("views.ingresar_pregunta.ejs", { id: req.query.id });
});

rutaPreguntas.get("/listar", listarPregunta);
rutaPreguntas.post("/crear", crearPregunta);
rutaPreguntas.get("/obtener/:id", obtenerPregunta);
rutaPreguntas.get("/editar", (req, res) => {
    res.render("views.editar_pregunta.ejs", { id: req.query.id });
});
rutaPreguntas.post("/editar", editarPregunta);
rutaPreguntas.post("/desactivar", desactivarPregunta);


export default rutaPreguntas;