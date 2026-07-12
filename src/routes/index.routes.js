import { Router } from "express";

import healthRouter from "./health.routes.js";
import eventsRouter from "./events.routes.js";
import sessionsRouter from "./sessions.routes.js";
import ticketsRouter from "./tickets.routes.js";

const router = Router();

// Health Check
router.use("/health", healthRouter);

// Autenticación
router.use("/sessions", sessionsRouter);

// Eventos e inscripciones
router.use("/events", eventsRouter);

// Operaciones sobre tickets
router.use("/tickets", ticketsRouter);

export default router;