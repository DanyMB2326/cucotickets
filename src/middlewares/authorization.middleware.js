import ApiError from "../utils/ApiError.js";

export const authorize = (...allowedRoles) => {

    return (req, res, next) => {

        if (!req.user) {
            return next(
                ApiError.unauthorized("No autenticado")
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                ApiError.forbidden("No tienes permisos para realizar esta acción")
            );
        }

        next();

    };

};