import express from "express";
import ruta from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",ruta);
app.set("port", 3000)

export default app;