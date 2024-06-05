import app from "./app.js";

app.listen(app.get("port"), ()=>{
    console.log(`Frontend en el puerto ${app.get("port")}`);
})