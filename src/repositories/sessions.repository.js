import sessionsDao from '../dao/sessions.dao.js';

// Estructura inicial. La lógica de autenticación se incorporará
// en próximas entregas (registro, login, JWT, cookies, Passport).

class SessionsRepository {
    async getCurrent() {
        return sessionsDao.getCurrent();
    }
}

export default new SessionsRepository();
