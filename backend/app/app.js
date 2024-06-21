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
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",ruta);
app.use(cookieParser())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, '../../frontend/src/views'));
app.use(express.static(path.join(__dirname, '../../frontend/src/public')));
app.set("port", process.env.PORT || 3000)
app.use(cors());
app.use(paymentRoutes);

export default app;