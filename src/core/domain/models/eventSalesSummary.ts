export class EventSalesSummary {
  totalRevenue: number;

  totalSeats: number

  constructor(totalRevenue: number = 0, totalSeats: number = 0) {
    this.totalRevenue = totalRevenue;
    this.totalSeats = totalSeats;
  }
}

