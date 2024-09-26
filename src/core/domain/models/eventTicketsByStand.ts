
interface TicketTypes {
  [type: string]: number;
}

interface GrandstandMap {
  [grandstand: string]: TicketTypes;
}
export class EventTicketsByStand {
  categories: string[];

  series: { name: string; data: number[] }[] = [];

  max: number = 0;

  constructor(jsonData: any[]) {
    const grandstandMap: GrandstandMap = {};
    const typesSet: Set<string> = new Set();

    jsonData.forEach((item) => {
      if (!grandstandMap[item.grandstand]) {
        grandstandMap[item.grandstand] = {};
      }

      grandstandMap[item.grandstand][item.type] = item.totalTickets || 0;

      typesSet.add(item.type);
    });

    const typesArray = Array.from(typesSet);

    this.categories = Object.keys(grandstandMap);

    this.series = typesArray.map((type) => ({
      name: type,
      data: this.categories.map((grandstand) => grandstandMap[grandstand][type] || 0),
    }));

    this.max = this.calculateMax(grandstandMap);
  }

  calculateMax(grandstandMap: GrandstandMap): number {
    let maxTotal = 0;
    Object.keys(grandstandMap).forEach((grandstand) => {
      const total = Object.values(grandstandMap[grandstand]).reduce(
        (sum, value) => sum + value,
        0
      );
      if (total > maxTotal) {
        maxTotal = total;
      }
    });

    return Math.ceil(maxTotal / 100) * 100;
  }

  getChartData() {
    return {
      categories: this.categories,
      series: this.series,
      max: this.max,
    };
  }
}
