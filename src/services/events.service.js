import eventsRepository from "../repositories/events.repository.js";
import ApiError from "../utils/ApiError.js";
class EventsService {

    async create(eventData, organizerId) {

        const event = {
            ...eventData,
            organizer: organizerId
        };

        return await eventsRepository.create(event);

    }

    async update(eventId, eventData, currentUser) {

        const event = await eventsRepository.findById(eventId);

        if (!event) {
            throw ApiError.notFound("Evento no encontrado");
        }

        // Si es organizer, solo puede modificar sus propios eventos
        if (
            currentUser.role === "organizer" &&
            event.organizer.toString() !== currentUser.id
        ) {
            throw ApiError.forbidden(
                "No puedes modificar eventos de otro organizador"
            );
        }

        return await eventsRepository.update(
            eventId,
            eventData
        );

    }

    async getAll() {
        return await eventsRepository.findAll();
    }

}

export default new EventsService();