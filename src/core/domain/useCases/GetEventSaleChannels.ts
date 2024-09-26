import type { EventService } from "../services/EventService";
import type { EventSaleChannels } from "../models/eventSaleChannels";

export class GetEventSalesChannels {
  constructor(private eventService: EventService) {}

  async execute(eventCode: string): Promise<EventSaleChannels> {
    return this.eventService.getEventSaleChannels(eventCode);
  }
}

