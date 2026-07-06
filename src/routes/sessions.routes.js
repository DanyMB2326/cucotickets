import { Router } from 'express';
import { getCurrentSession } from '../controllers/sessions.controller.js';

const router = Router();

// Estructura inicial. Próximas entregas: /register, /login, /logout
router.get('/current', getCurrentSession);

export default router;
