import type { EventService } from "../services/EventService";
import type { EventPaidMethods } from "../models/eventPaidMethod";

export class GetEventPaidMethods {
  constructor(private eventService: EventService) {}

  async execute(eventCode: string): Promise<EventPaidMethods> {
    return this.eventService.getPaidMethodsEvent(eventCode);
  }
}
