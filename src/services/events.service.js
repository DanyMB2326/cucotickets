import eventsRepository from "../repositories/events.repository.js";
import ApiError from "../utils/ApiError.js";
class EventsService {

    async create(eventData, organizerId) {

        const {
            date,
            capacity,
            price
        } = eventData;

        // Validar fecha (solo fecha, no hora)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0);

        if (eventDate < today) {
            throw ApiError.badRequest(
                "No se pueden crear eventos con fecha pasada"
            );
        }

        // Validar capacidad
        if (capacity <= 0) {
            throw ApiError.badRequest(
                "La capacidad debe ser mayor que cero"
            );
        }

        // Validar precio
        if (price < 0) {
            throw ApiError.badRequest(
                "El precio no puede ser negativo"
            );
        }

        const event = {
            ...eventData,
            organizer: organizerId
        };

        return await eventsRepository.create(event);

    }

    
    async update(eventId, eventData, currentUser) {

        // Validar capacidad
        if (
            eventData.capacity !== undefined &&
            eventData.capacity <= 0
        ) {
            throw ApiError.badRequest(
                "La capacidad debe ser mayor que cero"
            );
        }

        // Validar precio
        if (
            eventData.price !== undefined &&
            eventData.price < 0
        ) {
            throw ApiError.badRequest(
                "El precio no puede ser negativo"
            );
        }

        // Validar fecha
        if (eventData.date) {

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const eventDate = new Date(eventData.date);
            eventDate.setHours(0, 0, 0, 0);

            if (eventDate < today) {
                throw ApiError.badRequest(
                    "La fecha del evento no puede estar en el pasado"
                );
            }

        }

        const event =
            await eventsRepository.findById(eventId);

        if (!event) {
            throw ApiError.notFound(
                "Evento no encontrado"
            );
        }

        // No modificar eventos cancelados
        if (event.status === "cancelled") {
            throw ApiError.badRequest(
                "Un evento cancelado no puede modificarse"
            );
        }

        // Solo el organizador dueño o un admin
        const organizerId =
            event.organizer._id
                ? event.organizer._id.toString()
                : event.organizer.toString();

        if (
            currentUser.role === "organizer" &&
            organizerId !== currentUser.id
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

    async getAll(queryParams) {

        const {
            status,
            category,
            location,
            dateFrom,
            dateTo,
            page = 1,
            limit = 10,
            sort
        } = queryParams;

        const currentPage =
            Math.max(1, Number(page));

        const currentLimit =
            Math.max(1, Number(limit));

        const query = {};

        if (status) {
            query.status = status;
        }

        if (category) {
            query.category = category;
        }

        if (location) {
            query.location = location;
        }

        if (dateFrom || dateTo) {

            query.date = {};

            if (dateFrom) {
                query.date.$gte = new Date(dateFrom);
            }

            if (dateTo) {
                query.date.$lte = new Date(dateTo);
            }

        }

        const options = {

            skip:
                (currentPage - 1) * currentLimit,

            limit:
                currentLimit,

            // Actualmente solo se permite ordenar por fecha
            sort:
                sort === "date"
                    ? { date: 1 }
                    : {}

        };

        const data =
            await eventsRepository.find(
                query,
                options
            );

        const total =
            await eventsRepository.count(query);

        return {

            data,

            page:
                currentPage,

            limit:
                currentLimit,

            total,

            totalPages:
                Math.ceil(total / currentLimit)

        };

    }

    async changeStatus(eventId, status, currentUser) {

        const allowedStatus = [
            "draft",
            "published",
            "cancelled",
            "finished"
        ];

        if (!allowedStatus.includes(status)) {
            throw ApiError.badRequest(
                "Estado no válido"
            );
        }

        const event =
            await eventsRepository.findById(eventId);

        if (!event) {
            throw ApiError.notFound(
                "Evento no encontrado"
            );
        }

        // Solo organizador dueño o admin
        const organizerId =
            event.organizer._id
                ? event.organizer._id.toString()
                : event.organizer.toString();

        if (
            currentUser.role === "organizer" &&
            organizerId !== currentUser.id
        ) {
            throw ApiError.forbidden(
                "No puedes modificar eventos de otro organizador"
            );
        }

        // Un evento cancelado ya no puede cambiar de estado
        if (event.status === "cancelled") {
            throw ApiError.badRequest(
                "Un evento cancelado no puede cambiar de estado"
            );
        }

        // No volver a publicar eventos finalizados
        if (
            status === "published" &&
            event.status === "finished"
        ) {
            throw ApiError.badRequest(
                "No se puede volver a publicar un evento finalizado"
            );
        }

        return await eventsRepository.update(
            eventId,
            { status }
        );

    }

    async getById(id) {

        const event =
            await eventsRepository.findById(id);

        if (!event) {
            throw ApiError.notFound(
                "Evento no encontrado"
            );
        }

        return event;

    }

}

export default new EventsService();