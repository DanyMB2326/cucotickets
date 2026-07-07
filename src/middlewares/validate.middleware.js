import { ApiError } from '../utils/ApiError.js';

// Middleware de validación genérico.
// Recibe un schema de Zod y valida req.body, req.params o req.query
// según se indique. Si falla, lanza un ApiError 400 con el detalle.

export const validate = (schema, source = 'body') => (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
        const details = result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));
        return next(ApiError.badRequest('Datos inválidos', details));
    }

    req[source] = result.data;
    next();
};

export default validate;
