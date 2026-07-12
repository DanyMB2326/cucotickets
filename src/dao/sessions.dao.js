import User from "../models/User.js";

class SessionsDao {

    async findByEmail(email) {

        return await User.findOne({

            email: email.toLowerCase()

        });

    }

    async create(user) {

        return await User.create(user);

    }

    async findAll() {

        return await User.find()
            .select("-password");

    }

}

export default new SessionsDao();