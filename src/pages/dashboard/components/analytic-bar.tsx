import type { ChartOptions } from 'src/components/chart';

import useMediaQuery from '@mui/material/useMediaQuery';
import { Card, Skeleton, CardHeader } from '@mui/material';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { formatCurrency } from 'src/utils/format-currency';

import { Chart, useChart } from 'src/components/chart';

interface AnalyticBarProps {
  title?: string;
  subheader?: string;
  isVertical?: boolean;
  currentLocale?: string,
  money?: boolean;
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
  loading: boolean;
}

export default function AnalyticBar(props: AnalyticBarProps) {
  const { title, subheader, isVertical, money, chart, loading, currentLocale, ...other } = props;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
              position: 'left',
              offsetX: 150,
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
      tickAmount: chart.categories?.length,
      axisTicks: {
        show: isVertical,
      },
      axisBorder: {
        show: isVertical,
      },
      labels: {
        show: true,
        rotate: -45,
        
    
        style: {
          fontSize: "15",
        },
      },
    },

    yaxis: {
      max: chart.max,
      min: 0,
      tickAmount:8,
      labels: {
        style: {
          fontSize: "12",
          
        },
        formatter: (value: number) =>
          money
            ? formatCurrency(value || 0, currentLocale || 'mex')
            : `${value}`,
      },
    },
    legend: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number) =>
          money
            ? formatCurrency(value || 0, currentLocale || 'mex')
            : `${value}`,
      },
      theme: 'light',
    },

    annotations,

    plotOptions: {
      bar: {
        horizontal: !isVertical,

        columnWidth: chart.series[0].data.length === 1
          ? isMobile ? '30%' : '10%'
          : '50%',
      },
    },

    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {loading ? (
        <Skeleton variant="rectangular" height={364} sx={{m:3, py: 2.5, pl: 1, pr: 2.5 }} />
      ) : (
        <Chart
          type="bar"
          series={chart.series}
          options={chartOptions}
          height={364}
          sx={{ py: 0.5, pl: 1, pr: 2.5 }}
        />
      )}
    </Card>
  );
}
