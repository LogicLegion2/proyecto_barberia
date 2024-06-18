import { Router } from "express";
import { buscarOferta, crearOferta, desactivarOferta, editarOferta, listarOferta, obtenerOferta } from "../controllers/ofertas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


const rutaOfertas = Router();

rutaOfertas.get("/listar", listarOferta);
rutaOfertas.put("/buscar", buscarOferta);
rutaOfertas.post("/crear", crearOferta);
rutaOfertas.get("/obtener/:id", obtenerOferta);
rutaOfertas.get("/editar", (req, res) => {
    res.render("views.editar_oferta.ejs", { id: req.query.id });
});
rutaOfertas.post("/editar", editarOferta);
rutaOfertas.put("/desactivar", desactivarOferta);


export default rutaOfertas;