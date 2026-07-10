import { Router } from "express";
import passport from "passport";
import { authorize } from "../middlewares/authorization.middleware.js";


import {
    getCurrent,
    register,
    login, 
    logout,
    getUsers
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

router.get(
    "/users",
    passport.authenticate(
        "current",
        {
            session: false
        }
    ),
    authorize("admin"),
    getUsers
);

export default router;