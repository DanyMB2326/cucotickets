import sessionsService from '../services/sessions.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Estructura inicial de sesiones. Sin lógica de autenticación todavía.
// Próximas entregas: register, login, logout, current (con JWT/cookies).

export const getCurrentSession = asyncHandler(async (req, res) => {
    const session = await sessionsService.getCurrentSession();
    res.status(200).json({ status: 'ok', payload: session });
});
