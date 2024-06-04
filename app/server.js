import express from "express";
import { config } from "dotenv";
import ruta from "./routes/index.js";

config();

const server = express();

server.use("/", ruta);
server.set("port", process.env.PORT || 3000);

export default server;