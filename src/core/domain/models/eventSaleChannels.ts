
interface EventSaleChannelsData {
  salesChannel: string;
  totalSeats: number;
}

export class EventSaleChannels {
  series: { label: string; value: number }[] = [];

  constructor(jsonData: EventSaleChannelsData[]) {
    this.series = jsonData.map((item) => ({
      label: item.salesChannel,
      value: item.totalSeats,
    }));
  }

  getChartData() {
    return {
      series: this.series,
    };
  }
}
