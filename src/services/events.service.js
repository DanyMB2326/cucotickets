import eventsRepository from '../repositories/events.repository.js';

class EventsService {
    async getAllEvents() {
        return eventsRepository.getAll();
    }

    async getEventById(id) {
        return eventsRepository.getById(id);
    }

    async createEvent(eventData) {
        return eventsRepository.create(eventData);
    }
}

export default new EventsService();
