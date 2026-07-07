import { Router } from 'express';
import { getAllEvents, getEventById, createEvent } from '../controllers/events.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createEventSchema } from '../schemas/event.schema.js';

const router = Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', validate(createEventSchema), createEvent);

export default router;
