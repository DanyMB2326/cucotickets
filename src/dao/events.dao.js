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

    async findById(id) {
        return await Event.findById(id)
            .populate("organizer", "first_name last_name email");
    }

    async update(id, data) {
        return await Event.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async find(query = {}, options = {}) {

        const {
            sort = {},
            skip = 0,
            limit = 10
        } = options;

        return await Event.find(query)
            .populate("organizer", "first_name last_name email")
            .sort(sort)
            .skip(skip)
            .limit(limit);

    }

    async count(query = {}) {
        return await Event.countDocuments(query);
    }

}

export default new EventsDao();