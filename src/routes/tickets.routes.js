import { Router } from "express";
import passport from "passport";

import {
    getMyTickets,
    cancelTicket
} from "../controllers/tickets.controller.js";

const router = Router();

router.get(
    "/my-tickets",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    getMyTickets
);

router.patch(
    "/:tid/cancel",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    cancelTicket
);

export default router;