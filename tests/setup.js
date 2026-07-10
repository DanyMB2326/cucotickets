// Indicar que estamos en el entorno de pruebas
process.env.NODE_ENV = "test";

import { connectDB } from "../src/config/mongoose.js";

await connectDB();

console.log("MongoDB conectado para pruebas");

import { config } from "../src/config/env.config.js";
