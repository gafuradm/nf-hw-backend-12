import { CreateEventDto } from './dtos/CreateEvent.dot.js';
import EventModel, { IEvent } from './models/Event';

class EventService {
    async getEventById(id: string): Promise<IEvent | null> {
        return await EventModel.findById(id).exec();
    }

    async getEvents(page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<IEvent[]> {
        const skip = (page - 1) * pageSize;
        const sortCriteria: any = {};
        sortCriteria[sortBy] = sortDirection === 'desc' ? -1 : 1;
        return await EventModel.find().skip(skip).limit(pageSize).sort(sortCriteria).exec();
    }
    
    async getEventsByCity(city: string): Promise<IEvent[]> {
        return await EventModel.find({ city }).exec();
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
        const { name, description, date, location, duration, city } = createEventDto;
        const newEvent = new EventModel({
            name,
            description,
            date: new Date(date),
            location,
            duration,
            city
        });

        await newEvent.save();
        return newEvent;
    }
}

export default EventService;