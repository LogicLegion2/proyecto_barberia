import { Router } from "express";
import rutaProductos from "./productos.routes.js";
import rutaServicios from "./servicios.routes.js";
import rutaUsuarios from "./usuarios.routes.js";
import rutaUbicaciones from "./ubicaciones.routes.js";
import rutaBarberos from "./barbero.routes.js";
import rutaComentarios from "./comentarios.routes.js";
import rutaOfertas from "./ofertas.routes.js";
import rutaPreguntas from "./preguntas.routes.js";
import rutaReservaAdmin from "./reservas.routes.js";
import rutaVentas from "./ventas.routes.js";
import rutaFavoritos from "./favoritos.routes.js";


/**
 * Estas son las rutas del backend en mi proyecto 
 * @type {object}
 */
const ruta = Router();

ruta.use("/productos", rutaProductos)
ruta.use("/servicios", rutaServicios)
ruta.use("/usuarios", rutaUsuarios)
ruta.use("/ubicaciones", rutaUbicaciones)
ruta.use("/barberos", rutaBarberos)
ruta.use("/comentarios", rutaComentarios)
ruta.use("/ofertas", rutaOfertas)
ruta.use("/preguntas", rutaPreguntas)
ruta.use("/reservas", rutaReservaAdmin)
ruta.use("/ventas", rutaVentas)
ruta.use("/favoritos", rutaFavoritos)

export default ruta;