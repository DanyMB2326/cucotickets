import dotenv from "dotenv";

const envFile = process.env.ENV_FILE || ".env";

dotenv.config({ path: envFile });

export const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || "development",
    mongoUrl: process.env.MONGO_URL || "",
    jwtSecret: process.env.JWT_SECRET || "",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h"
};