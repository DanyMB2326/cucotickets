import sessionsService from '../services/sessions.service.js';

// Estructura inicial de sesiones. Sin lógica de autenticación todavía.
// Próximas entregas: register, login, logout, current (con JWT/cookies).

export const getCurrentSession = async (req, res) => {
    try {
        const session = await sessionsService.getCurrentSession();
        res.status(200).json({ status: 'ok', payload: session });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener la sesión' });
    }
};
