// Envuelve un controlador async para capturar cualquier error y
// reenviarlo a next(), donde lo procesará el middleware de errores global.
// Evita repetir try/catch en cada controlador.

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
