import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import EventController from './event-controller';
import EventService from './event-service';

const eventRouter = Router();

const eventService = new EventService();
const eventController = new EventController(eventService);

eventRouter.get('/events', eventController.getEvents);
eventRouter.post('/events', authMiddleware, eventController.createEvent);
eventRouter.get('/events/:id', eventController.getEventById);
eventRouter.get('/eventsByCity', authMiddleware, eventController.getEventsByCity);

export default eventRouter;