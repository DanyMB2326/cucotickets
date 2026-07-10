import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

// Middleware de manejo de errores global.
// Debe registrarse al final, después de todas las rutas y middlewares.
// Express lo reconoce como error handler por tener 4 parámetros.

export const errorHandler = (err, req, res, next) => {
    const isApiError = err instanceof ApiError;
    const statusCode = isApiError ? err.statusCode : 500;
    const message = isApiError ? err.message : 'Error interno del servidor';

    if (!isApiError) {
        console.error("ERROR COMPLETO:");
        console.error(err);

        logger.error(err.stack || err.message);
    }
    
    res.status(statusCode).json({
        status: 'error',
        message,
        ...(isApiError && err.details ? { details: err.details } : {}),
    });
};

export default errorHandler;
