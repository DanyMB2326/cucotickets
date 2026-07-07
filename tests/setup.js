import { connectDB } from "../src/config/mongoose.js";

await connectDB();

console.log("MongoDB conectado para pruebas");