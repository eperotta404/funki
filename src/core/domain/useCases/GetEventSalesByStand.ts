import type { EventService } from "../services/EventService";
import type { EventSalesByStand } from "../models/eventSalesByStand";

export class GetEventSalesByStand {
  constructor(private eventService: EventService) {}

  async execute(eventCode: string): Promise<EventSalesByStand> {
    return this.eventService.getSalesByStandEvent(eventCode);
  }
}
