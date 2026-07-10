import { Router } from "express";
import passport from "passport";

import {
    createEvent,
    getEvents,
    updateEvent
} from "../controllers/events.controller.js";

import { authorize } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get(
    "/",
    getEvents
);

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
    createEvent
);

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
    updateEvent
);

export default router;