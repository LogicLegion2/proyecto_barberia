import express, {urlencoded} from "express";
import ruta from "./routes/index.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",ruta);
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, '../../frontend/src/views'));
app.set("port", 3000)
// app.get("/esneider", (req, res) => {
//     const data = {message: "esniede"}
//     res.render("views.barberos.ejs", {data})
// })

export default app;