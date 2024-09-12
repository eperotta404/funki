import { EventDetail } from "./eventDetail";

export class Event {
  id: string;

  name: string

  details: EventDetail;

  constructor(id: string, name: string, eventData: { code: string, description: string, venue: string, type: string, date: string, expired: boolean, enabled: boolean, home: string, away: string }) {
    this.id = id;
    this.name = name;
    this.details = new EventDetail(
      eventData.code,
      eventData.description,
      eventData.venue,
      eventData.type,
      eventData.date,
      eventData.expired,
      eventData.enabled,
      eventData.home,
      eventData.away,
    );
  }
}

