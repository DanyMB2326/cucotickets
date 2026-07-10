import eventsDao from "../dao/events.dao.js";

class EventsRepository {

    create(event) {
        return eventsDao.create(event);
    }

    findById(id) {
        return eventsDao.findById(id);
    }

    findAll() {
        return eventsDao.findAll();
    }

    update(id, data) {
        return eventsDao.update(id, data);
    }

}

export default new EventsRepository();