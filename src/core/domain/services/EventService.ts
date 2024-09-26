import type { EventSalesSummary } from "../models/eventSalesSummary";
import type { EventSalesByStand } from "../models/eventSalesByStand";
import type { EventRepository } from "../repositories/EventRepository";
import type { EventTicketsByStand } from "../models/eventTicketsByStand";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getSalesSummaryEvent(eventCode: string): Promise<EventSalesSummary> {
    return this.eventRepository.getSalesSummaryEvent(eventCode);
  }

  async getTicketsByStandEvent(eventCode: string): Promise<EventTicketsByStand> {
    return this.eventRepository.getTicketsByStandEvent(eventCode);
  }

  async getSalesByStandEvent(eventCode: string): Promise<EventSalesByStand> {
    return this.eventRepository.getSalesByStandEvent(eventCode);
  }
}
