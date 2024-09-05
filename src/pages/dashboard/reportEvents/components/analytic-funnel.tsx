// eslint-disable-next-line import/no-extraneous-dependencies
import Highcharts from 'highcharts';
// eslint-disable-next-line import/no-extraneous-dependencies
import HighchartsReact from 'highcharts-react-official';
// eslint-disable-next-line import/no-extraneous-dependencies
import HighchartsFunnel from 'highcharts/modules/funnel';

import { Card, CardHeader } from '@mui/material';

interface AnalyticFunnelProps {
  title?: string;
  subheader?: string;
  chartData: [string, number][];
}

export default function AnalyticFunnel(props: AnalyticFunnelProps) {
  const { title, subheader, chartData } = props;
  HighchartsFunnel(Highcharts);

  const options: Highcharts.Options = {
    chart: {
      type: 'funnel',
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      funnel: {
        neckWidth: '20%',
        neckHeight: '10%',
        width: '60%',
        height: '100%',
      },
    },

    
    series: [
      {
        type: 'funnel',
        name: title,
        data: chartData,
      },
    ],
  };
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <HighchartsReact highcharts={Highcharts} options={options} />;
    </Card>
  );
}
