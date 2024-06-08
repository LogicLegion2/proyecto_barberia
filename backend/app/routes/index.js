import { Router } from "express";
import rutaproductos from "./productos.routes.js";
import rutaservicios from "./servicios.routes.js";
import rutausuarios from "./usuarios.routes.js";
import rutaubicaciones from "./ubicaciones.routes.js";
import rutabarberos from "./barbero.routes.js";
import rutacomentarios from "./comentarios.routes.js";
import rutaofertas from "./ofertas.routes.js";
import rutapreguntas from "./preguntas.routes.js";
import rutaReservaAdmin from "./reservas.routes.js";


const ruta = Router();


ruta.use("/productos", rutaproductos)
ruta.use("/servicio", rutaservicios)
ruta.use("/usuarios", rutausuarios)
ruta.use("/ubicaciones", rutaubicaciones)
ruta.use("/barberos", rutabarberos)
ruta.use("/comentarios", rutacomentarios)
ruta.use("/ofertas", rutaofertas)
ruta.use("/preguntas", rutapreguntas)
ruta.use("/reservas", rutaReservaAdmin)

export default ruta;