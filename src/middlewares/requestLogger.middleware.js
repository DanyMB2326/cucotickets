import { logger } from '../utils/logger.js';

// Loguea cada request entrante: método, ruta y status de la respuesta.
export const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    });

    next();
};

export default requestLogger;
