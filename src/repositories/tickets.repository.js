import ticketsDao from "../dao/tickets.dao.js";

class TicketsRepository {

    async create(ticket) {
        return await ticketsDao.create(ticket);
    }

    async findById(id) {
        return await ticketsDao.findById(id);
    }

    async findByUser(userId) {
        return await ticketsDao.findByUser(userId);
    }

    async findByEvent(eventId) {
        return await ticketsDao.findByEvent(eventId);
    }

    async findActiveByUserAndEvent(userId, eventId) {
        return await ticketsDao.findActiveByUserAndEvent(
            userId,
            eventId
        );
    }

    async countReservedSeats(eventId) {
        return await ticketsDao.countReservedSeats(
            eventId
        );
    }

    async update(id, data) {
        return await ticketsDao.update(id, data);
    }

}

export default new TicketsRepository();