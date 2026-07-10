import Event from "../models/Event.js";

class EventsDao {

    async create(event) {
        return await Event.create(event);
    }

    async findById(id) {
        return await Event.findById(id);
    }

    async findAll() {
        return await Event.find().populate("organizer", "first_name last_name email");
    }

    async update(id, data) {
        return await Event.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

}

export default new EventsDao();