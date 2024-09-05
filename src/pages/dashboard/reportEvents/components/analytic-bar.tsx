import type { ChartOptions } from 'src/components/chart';

import { Card, CardHeader } from '@mui/material';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

interface AnalyticBarProps {
  title?: string;
  subheader?: string;

  chart: {
    colors?: string[];
    categories?: string[];
    max: number;
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
}

export default function AnalyticBar(props: AnalyticBarProps) {
  const { title, subheader, chart, ...other } = props;
  const theme = useTheme();
  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    hexAlpha(theme.palette.warning.main, 0.8),
    hexAlpha(theme.palette.error.main, 0.8),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chart.categories,
    },

    yaxis: {
      max: chart.max,
      min: 0,

      labels: {
        formatter: (value: number) => `${value}`,
      },
    },
    legend: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}`,
      },
      theme: 'light',
    },

    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        height={364}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
