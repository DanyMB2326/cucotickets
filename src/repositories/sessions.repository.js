import sessionsDao from "../dao/sessions.dao.js";

class SessionsRepository {

    async findByEmail(email) {

        return await sessionsDao.findByEmail(
            email
        );

    }

    async create(user) {

        return await sessionsDao.create(
            user
        );

    }

    async findAll() {

        return await sessionsDao.findAll();

    }

}

export default new SessionsRepository();