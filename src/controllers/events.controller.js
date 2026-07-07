import eventsService from '../services/events.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllEvents = asyncHandler(async (req, res) => {
    const events = await eventsService.getAllEvents();
    res.status(200).json({ status: 'ok', payload: events });
});

export const getEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const event = await eventsService.getEventById(id);

    if (!event) {
        throw ApiError.notFound('Evento no encontrado');
    }

    res.status(200).json({ status: 'ok', payload: event });
});

export const createEvent = asyncHandler(async (req, res) => {
    const newEvent = await eventsService.createEvent(req.body);
    res.status(201).json({ status: 'ok', payload: newEvent });
});
