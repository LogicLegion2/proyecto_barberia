import express, {urlencoded} from "express";
import ruta from "./routes/index.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/payment.routes.js";
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",ruta);
app.use(cookieParser())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, '../../frontend/src/views'));
app.use(express.static(path.join(__dirname, '../../frontend/src/public')));
app.set("port", 3000)
app.use(paymentRoutes);

export default app;