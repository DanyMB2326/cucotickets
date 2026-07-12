import crypto from "crypto";

import ticketsRepository from "../repositories/tickets.repository.js";
import eventsRepository from "../repositories/events.repository.js";

import ApiError from "../utils/ApiError.js";
import mailService from "./mail.service.js";

class TicketsService {

    async create(eventId, currentUser, quantity) {

        // Validar cantidad
        if (
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            throw ApiError.badRequest(
                "La cantidad debe ser mayor que cero"
            );
        }

        // Buscar evento
        const event =
            await eventsRepository.findById(eventId);

        if (!event) {
            throw ApiError.notFound(
                "Evento no encontrado"
            );
        }

        // El evento debe estar publicado
        if (event.status === "cancelled") {
            throw ApiError.badRequest(
                "El evento está cancelado"
            );
        }

        if (event.status === "finished") {
            throw ApiError.badRequest(
                "El evento ya finalizó"
            );
        }

        if (event.status !== "published") {
            throw ApiError.badRequest(
                "El evento no está publicado"
            );
        }

        // Validar que la fecha del evento no haya pasado
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);

        if (eventDate < today) {
            throw ApiError.badRequest(
                "El evento ya finalizó"
            );
        }

        // Verificar ticket duplicado
        const existingTicket =
            await ticketsRepository.findActiveByUserAndEvent(
                currentUser.id,
                eventId
            );

        if (existingTicket) {
            throw ApiError.conflict(
                "Ya tienes una inscripción activa para este evento"
            );
        }

        // Calcular cupos ocupados
        const reservedSeats =
            await ticketsRepository.countReservedSeats(
                event._id
            );

        const availableSeats =
            event.capacity - reservedSeats;

        if (availableSeats < quantity) {
            throw ApiError.badRequest(
                "No hay cupos suficientes"
            );
        }

        // Generar código de reservación
        const reservationCode =
            crypto.randomUUID();

        // Crear ticket
        const ticket =
            await ticketsRepository.create({

                user: currentUser.id,

                event: eventId,

                quantity,

                reservationCode,

                status: "confirmed"

            });

        // Enviar correo (si falla, el ticket sigue siendo válido)
        // En pruebas no se envían correos
if (process.env.NODE_ENV !== "test") {

    try {

        await mailService.sendTicketConfirmation(

            currentUser.email,

            event,

            quantity,

            reservationCode

        );

    } catch (error) {

        console.error(
            "Error enviando correo:",
            error.message
        );

    }

}
        return ticket;

    }

    async getMyTickets(userId) {

        return await ticketsRepository.findByUser(
            userId
        );

    }

    async getEventTickets(eventId, currentUser) {

        const event =
            await eventsRepository.findById(eventId);

        if (!event) {
            throw ApiError.notFound(
                "Evento no encontrado"
            );
        }

        // El organizer solo puede consultar
        // los tickets de sus propios eventos
        if (currentUser.role !== "admin") {

            const organizerId =
                event.organizer._id
                    ? event.organizer._id.toString()
                    : event.organizer.toString();

            if (organizerId !== currentUser.id) {

                throw ApiError.forbidden(
                    "No puedes consultar los tickets de este evento"
                );

            }

        }

        return await ticketsRepository.findByEvent(
            eventId
        );

    }

    async cancel(ticketId, currentUser) {

        const ticket =
            await ticketsRepository.findById(ticketId);

        if (!ticket) {
            throw ApiError.notFound(
                "Ticket no encontrado"
            );
        }

        if (ticket.status === "cancelled") {
            throw ApiError.badRequest(
                "El ticket ya fue cancelado"
            );
        }

        const ownerId =
            ticket.user._id
                ? ticket.user._id.toString()
                : ticket.user.toString();

        if (
            currentUser.role !== "admin" &&
            ownerId !== currentUser.id
        ) {
            throw ApiError.forbidden(
                "No puedes cancelar un ticket ajeno"
            );
        }

        return await ticketsRepository.update(
            ticketId,
            {
                status: "cancelled",
                cancelledAt: new Date()
            }
        );

    }

}

export default new TicketsService();