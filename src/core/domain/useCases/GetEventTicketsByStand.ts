import type { EventService } from "../services/EventService";
import type { EventTicketsByStand } from "../models/eventTicketsByStand";

export class GetEventTicketsByStand {
  constructor(private eventService: EventService) {}

  async execute(eventCode: string): Promise<EventTicketsByStand> {
    return this.eventService.getTicketsByStandEvent(eventCode);
  }
}
