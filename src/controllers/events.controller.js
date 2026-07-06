import eventsService from '../services/events.service.js';

export const getAllEvents = async (req, res) => {
    try {
        const events = await eventsService.getAllEvents();
        res.status(200).json({ status: 'ok', payload: events });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener los eventos' });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventsService.getEventById(id);

        if (!event) {
            return res.status(404).json({ status: 'error', message: 'Evento no encontrado' });
        }

        res.status(200).json({ status: 'ok', payload: event });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener el evento' });
    }
};

export const createEvent = async (req, res) => {
    try {
        const newEvent = await eventsService.createEvent(req.body);
        res.status(201).json({ status: 'ok', payload: newEvent });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al crear el evento' });
    }
};
