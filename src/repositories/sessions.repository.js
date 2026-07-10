import sessionsDao from "../dao/sessions.dao.js";

class SessionsRepository {

    async findByEmail(email) {
        return sessionsDao.findByEmail(email);
    }

    async create(user) {
        return sessionsDao.create(user);
    }

}

export default new SessionsRepository();