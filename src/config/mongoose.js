import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};