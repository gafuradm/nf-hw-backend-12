export interface CreateEventDto {
  name: string;
  description: string;
  date: Date;
  location: string;
  duration: string;
  city: string;
}
export interface Event {
  id: number;
  name: string;
  description: string;
  date: Date;
  location: string;
  duration: string;
  city: string;
}
