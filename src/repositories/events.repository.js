import eventsDao from "../dao/events.dao.js";

class EventsRepository {

    create(event) {
        return eventsDao.create(event);
    }

    findById(id) {
        return eventsDao.findById(id);
    }

    find(query, options) {
        return eventsDao.find(query, options);
    }

    count(query) {
        return eventsDao.count(query);
    }

    update(id, data) {
        return eventsDao.update(id, data);
    }

}

export default new EventsRepository();