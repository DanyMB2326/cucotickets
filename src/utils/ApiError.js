// Error personalizado para la API.
// Permite lanzar errores con un status HTTP y un mensaje claro desde
// cualquier capa (controller, service, repository) y que el middleware
// de errores global los transforme en una respuesta consistente.

export class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.details = details;
    }

    static badRequest(message, details = null) {
        return new ApiError(400, message, details);
    }

    static notFound(message = 'Recurso no encontrado') {
        return new ApiError(404, message);
    }

    static internal(message = 'Error interno del servidor') {
        return new ApiError(500, message);
    }
}

export default ApiError;
