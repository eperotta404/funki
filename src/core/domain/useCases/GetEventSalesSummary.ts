import type { EventService } from "../services/EventService";
import type { EventSalesSummary } from "../models/eventSalesSummary";

export class GetEventSalesSummary {
  constructor(private eventService: EventService) {}

  async execute(eventCode: string): Promise<EventSalesSummary> {
    return this.eventService.getSalesSummaryEvent(eventCode);
  }
}
