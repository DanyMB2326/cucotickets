import sessionsDao from "../dao/sessions.dao.js";

class SessionsRepository {

    async findByEmail(email) {
        return sessionsDao.findByEmail(email);
    }

    async create(user) {
        return sessionsDao.create(user);
    }

    async findAll() {
        return sessionsDao.findAll();
    }

}

export default new SessionsRepository();