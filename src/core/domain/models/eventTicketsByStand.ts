interface TicketTypes {
  TICKET: number;
  BUNDLE: number;
  COURTESY: number;
}

interface GrandstandMap {
  [key: string]: TicketTypes;
}

export class EventTicketsByStand {
  categories: string[];

  series: { name: string; data: number[] }[];

  constructor(jsonData: any[]) {
    const grandstandMap: GrandstandMap = {};

    jsonData.forEach((item) => {
      if (!grandstandMap[item.grandstand]) {
        grandstandMap[item.grandstand] = {
          TICKET: 0,
          BUNDLE: 0,
          COURTESY: 0,
        };
      }
      grandstandMap[item.grandstand][item.type as keyof TicketTypes] = item.totalTickets;
    });

    this.categories = Object.keys(grandstandMap);

    const ticketSeries = this.categories.map((grandstand) => grandstandMap[grandstand].TICKET || 0);
    const bundleSeries = this.categories.map((grandstand) => grandstandMap[grandstand].BUNDLE || 0);
    const courtesySeries = this.categories.map((grandstand) => grandstandMap[grandstand].COURTESY || 0);

    this.series = [
      { name: 'TICKET', data: ticketSeries },
      { name: 'BUNDLE', data: bundleSeries },
      { name: 'COURTESY', data: courtesySeries },
    ];
  }

  getChartData() {
    return {
      categories: this.categories,
      series: this.series,
    };
  }
}



