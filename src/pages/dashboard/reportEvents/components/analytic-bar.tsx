import type { ChartOptions } from 'src/components/chart';

import { Card, CardHeader } from '@mui/material';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

interface AnalyticBarProps {
  title?: string;
  subheader?: string;
  isVertical?: boolean;
  chart: {
    colors?: string[];
    stacked: boolean;
    categories?: string[];
    max: number;
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
    yAxisMarker?: number;
  };
}

export default function AnalyticBar(props: AnalyticBarProps) {
  const { title, subheader,isVertical, chart, ...other } = props;
  const theme = useTheme();
  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    hexAlpha(theme.palette.warning.main, 0.8),
    hexAlpha(theme.palette.error.main, 0.8),
  ];


  const annotations = chart.yAxisMarker
  ? {
      yaxis: [
        {
          y: chart.yAxisMarker,
          borderColor: theme.palette.info.main,
          strokeDashArray: 4, 
          label: {
            borderColor: theme.palette.info.main,
            style: {
              color: '#fff',
              background: theme.palette.info.main,
            },
            text: `10% del aforo`,
          },
        },
      ],
    }
  : {};



  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      colors: ['transparent'],
    },
    chart: {
      stacked: chart.stacked,
    },

    xaxis: {
      categories: chart.categories,
      axisTicks: {
        show: isVertical ,
      },
      axisBorder: {
        show: isVertical,
      },
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

    annotations,

    plotOptions: {
      bar: {
        horizontal: !isVertical, 
      },
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
