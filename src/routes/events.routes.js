import { Router } from "express";
import passport from "passport";

import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    changeStatus
} from "../controllers/events.controller.js";

import {
    createTicket,
    getEventTickets
} from "../controllers/tickets.controller.js";

import { authorize } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createEventSchema,
    updateEventSchema,
    statusSchema
} from "../schemas/event.schema.js";

import { createTicketSchema } from "../schemas/ticket.schema.js";

const router = Router();

/**
 * ==========================================================
 * EVENTOS
 * ==========================================================
 */

/**
 * GET /api/events
 * Público
 */
router.get(
    "/",
    getEvents
);

/**
 * POST /api/events
 * Organizer y Admin
 */
router.post(
    "/",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    authorize(
        "organizer",
        "admin"
    ),
    validate(createEventSchema),
    createEvent
);

/**
 * ==========================================================
 * TICKETS DEL EVENTO
 * ==========================================================
 */

/**
 * POST /api/events/:eid/tickets
 * Usuario autenticado
 */
router.post(
    "/:eid/tickets",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    validate(createTicketSchema),
    createTicket
);

/**
 * GET /api/events/:eid/tickets
 * Organizer dueño o Admin
 */
router.get(
    "/:eid/tickets",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    authorize(
        "organizer",
        "admin"
    ),
    getEventTickets
);

/**
 * ==========================================================
 * MODIFICAR EVENTOS
 * ==========================================================
 */

/**
 * PATCH /api/events/:id/status
 */
router.patch(
    "/:id/status",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    authorize(
        "organizer",
        "admin"
    ),
    validate(statusSchema),
    changeStatus
);

/**
 * PUT /api/events/:id
 */
router.put(
    "/:id",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    authorize(
        "organizer",
        "admin"
    ),
    validate(updateEventSchema),
    updateEvent
);

/**
 * GET /api/events/:id
 * Público
 *
 * SIEMPRE AL FINAL
 * porque captura cualquier parámetro.
 */
router.get(
    "/:id",
    getEventById
);

export default router;