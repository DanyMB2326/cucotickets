import { Router } from "express";
import passport from "passport";

import {
    getCurrent,
    register,
    login, 
    logout
} from "../controllers/sessions.controller.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
    registerSchema,
    loginSchema
} from "../schemas/session.schema.js";

const router = Router();

router.get(
    "/current",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    getCurrent
);

router.post(
    "/register",
    validate(registerSchema),
    passport.authenticate(
        "register",
        {
            session: false
        }
    ),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    passport.authenticate(
        "login",
        {
            session: false,
            failureMessage: true
        }
    ),
    login
);

router.post("/logout", logout);

export default router;