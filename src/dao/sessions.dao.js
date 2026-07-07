import User from "../models/User.js";

class SessionsDao {

    async getCurrent() {
        return null;
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(user) {
        return await User.create(user);
    }

}

export default new SessionsDao();