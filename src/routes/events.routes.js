import { Router } from "express";
import passport from "passport";

import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    changeStatus
} from "../controllers/events.controller.js";

import { authorize } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createEventSchema,
    updateEventSchema,
    statusSchema
} from "../schemas/event.schema.js";

const router = Router();

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
 * Solo organizer y admin
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
 * PATCH /api/events/:id/status
 * Solo organizer dueño o admin
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
 * Solo organizer dueño o admin
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
 */
router.get(
    "/:id",
    getEventById
);

export default router;