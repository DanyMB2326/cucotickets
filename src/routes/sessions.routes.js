import { Router } from "express";

import {
    getCurrent,
    register
} from "../controllers/sessions.controller.js";

const router = Router();

router.get("/current", getCurrent);

router.post("/register", register);

export default router;