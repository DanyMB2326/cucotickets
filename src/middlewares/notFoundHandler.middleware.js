import { ApiError } from '../utils/ApiError.js';

// Se ejecuta cuando ninguna ruta coincidió con el request.
// Debe ir registrado después de todas las rutas y antes del errorHandler.
export const notFoundHandler = (req, res, next) => {
    next(ApiError.notFound(`La ruta ${req.method} ${req.originalUrl} no existe`));
};

export default notFoundHandler;
