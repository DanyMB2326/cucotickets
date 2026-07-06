import sessionsRepository from '../repositories/sessions.repository.js';

// Estructura inicial. Sin lógica de autenticación todavía.
// Próximas entregas: registro, login, JWT, cookies, Passport, roles.

class SessionsService {
    async getCurrentSession() {
        return sessionsRepository.getCurrent();
    }
}

export default new SessionsService();
