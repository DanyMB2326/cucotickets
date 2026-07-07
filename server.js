import app from "./src/app.js";

import { connectDB } from "./src/config/mongoose.js";
import { config } from "./src/config/env.config.js";

await connectDB();

app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
});