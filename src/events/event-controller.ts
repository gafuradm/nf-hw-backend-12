import { Request, Response } from 'express';
import EventService from './event-service';
import { CreateEventDto, Event } from './types/response';

class EventController {
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const createEvent: CreateEventDto = req.body; // Изменено на CreateEventDto
            const event = await this.eventService.createEvent(createEvent);
            res.status(201).json(event);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const { page = 1, pageSize = 10, sortBy = 'date', sortDirection = 'asc' } = req.query;
            const events = await this.eventService.getEvents(Number(page), Number(pageSize), String(sortBy), String(sortDirection));
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const event = await this.eventService.getEventById(id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            res.status(200).json(event);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEventsByCity = async (req: Request, res: Response): Promise<void> => {
        try {
            const city = (req.user as any).city;
            const events = await this.eventService.getEventsByCity(city);
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default EventController;
