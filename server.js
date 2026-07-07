import express from "express";
import sessionsRouter from "./src/routes/sessions.routes.js";
import { connectDB } from "./src/config/mongoose.js";

const app = express();

app.use(express.json());

app.use("/api/sessions", sessionsRouter);

// Conectar a MongoDB
await connectDB();

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});