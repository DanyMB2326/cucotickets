// Logger mínimo reutilizable. En próximas entregas puede reemplazarse
// por una librería como Winston o Pino sin cambiar quién lo consume.

export const logger = {
    info: (message) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
    warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
    error: (message) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`),
};

export default logger;
