import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";

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
    auth,
    getCurrent
);

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post("/logout", logout);

export default router;