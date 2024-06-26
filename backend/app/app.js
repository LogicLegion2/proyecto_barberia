import express, {urlencoded} from "express";
import ruta from "./routes/index.js";
import cors from "cors";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/payment.routes.js";
import morgan from "morgan";
dotenv.config(); // Carga las variables de entorno desde el archivo .env
const app = express(); // Crea una instancia de la aplicación Express

// Configuración de rutas de registro de peticiones HTTP
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Middleware para registrar las solicitudes HTTP en consola durante el desarrollo
app.use(morgan("dev"))

// Middleware para manejar JSON y formularios codificados en las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Middleware para permitir solicitudes CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para utilizar las rutas definidas en ./routes/index.js para gestionar las solicitudes
app.use("/",ruta);

// Middleware para manejar cookies en las solicitudes
app.use(cookieParser())

// Establece el motor de plantillas y la ubicación de las vistas de EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, '../../frontend/src/views'));

// Middleware para servir archivos estáticos (CSS, imágenes, etc.) desde el directorio público
app.use(express.static(path.join(__dirname, '../../frontend/src/public')));

// Establece el puerto en el que escuchará el servidor, usando el puerto definido en las variables de entorno o el puerto 3000 por defecto
app.set("port", process.env.PORT || 3000);

// Configura las rutas para manejar pagos
app.use(paymentRoutes);

export default app;