import type { EventRepository } from 'src/core/domain/repositories/EventRepository';

import { EventSalesSummary } from 'src/core/domain/models/eventSalesSummary';
import { EventTicketsByStand } from 'src/core/domain/models/eventTicketsByStand';

import type { HttpClient } from '../http/HttpClient';

export class EventApi implements EventRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getSalesSummaryEvent(eventCode: string): Promise<EventSalesSummary> {
    try {
      const params = new URLSearchParams({ eventCode }).toString();
      const response = await this.httpClient.get(`/salesSummary?${params}`);
      const { totalNetGmvLocal, totalSeats } = response.data || {};
      return new EventSalesSummary(totalNetGmvLocal, totalSeats);
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  }

  async getTicketsByStandEvent(eventCode: string): Promise<EventTicketsByStand> {
    try {
      const params = new URLSearchParams({ eventCode }).toString();
      const response = await this.httpClient.get(`/ticketsByStand?${params}`);
      return new EventTicketsByStand( response.data);
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  }
}
