export class EventSalesByStand {
  categories: string[];

  series: { name: string; data: number[] }[];

  max: number;

  constructor(jsonData: any[]) {
    this.categories = jsonData.map((item) => item.grandstand);

    const totalGmvLocalSeries = {
      name: 'events.totals.tickets',
      data: jsonData.map((item) => item.totalGmvLocal),
    };

    const maxTotalGmvLocal = Math.max(...jsonData.map((item) => item.totalGmvLocal));

    this.max = Math.ceil(maxTotalGmvLocal / 100) * 100;

    this.series = [totalGmvLocalSeries];
  }

  getChartData() {
    return {
      categories: this.categories,
      series: this.series,
      max: this.max,
    };
  }
}
