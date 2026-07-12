import eventsService from "../services/events.service.js";
import EventDTO from "../dto/EventDTO.js";

export const createEvent = async (req, res, next) => {

    try {

        const event =
            await eventsService.create(
                req.body,
                req.user.id
            );

        res.status(201).json({
            status: "success",
            payload: new EventDTO(event)
        });

    } catch (error) {

        next(error);

    }

};

export const getEvents = async (req, res, next) => {

    try {

        const result =
            await eventsService.getAll(
                req.query
            );

        res.status(200).json({

            status: "success",

            payload: {

                ...result,

                data: result.data.map(
                    event => new EventDTO(event)
                )

            }

        });

    } catch (error) {

        next(error);

    }

};

export const updateEvent = async (req, res, next) => {

    try {

        const event =
            await eventsService.update(
                req.params.id,
                req.body,
                req.user
            );

        res.status(200).json({

            status: "success",

            payload: new EventDTO(event)

        });

    } catch (error) {

        next(error);

    }

};

export const getEventById = async (req, res, next) => {

    try {

        const event =
            await eventsService.getById(
                req.params.id
            );

        res.status(200).json({

            status: "success",

            payload: new EventDTO(event)

        });

    } catch (error) {

        next(error);

    }

};

export const changeStatus = async (req, res, next) => {

    try {

        const event =
            await eventsService.changeStatus(
                req.params.id,
                req.body.status,
                req.user
            );

        res.status(200).json({

            status: "success",

            payload: new EventDTO(event)

        });

    } catch (error) {

        next(error);

    }

};