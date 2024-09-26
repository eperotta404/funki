
interface PaymentMethodData {
  paymentMethod: string;
  totalSeats: number;
}

export class EventPaidMethods {
  series: { label: string; value: number }[] = [];

  constructor(jsonData: PaymentMethodData[]) {
    this.series = jsonData.map((item) => ({
      label: item.paymentMethod,
      value: item.totalSeats,
    }));
  }

  getChartData() {
    return {
      series: this.series,
    };
  }
}
