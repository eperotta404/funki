import type { EventPaidMethods } from "../models/eventPaidMethod";
import type { EventSaleChannels } from "../models/eventSaleChannels";
import type { EventSalesByStand } from "../models/eventSalesByStand";
import type { EventSalesSummary } from "../models/eventSalesSummary";
import type { EventTicketsByStand } from "../models/eventTicketsByStand";

export interface EventRepository {
  getSalesSummaryEvent(eventCode: string): Promise<EventSalesSummary>;
  getTicketsByStandEvent(eventCode: string): Promise<EventTicketsByStand>;
  getSalesByStandEvent(eventCode: string): Promise<EventSalesByStand>;
  getPaidMethodsEvent(eventCode: string): Promise<EventPaidMethods>;
  getSaleChannelsEvent(eventCode: string): Promise<EventSaleChannels>;
}
