import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import AnalyticBar from './analytic-bar';
import AnalyticPie from './analytic-pie';
import AnalyticFunnel from './analytic-funnel';

export default function DetailsEvent() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <h2>{t('events.details.details')}</h2>
      <Box
        gap={8}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        sx={{ mt: 2 }}
      >
        <AnalyticBar
          title={t('events.details.ticketsByTribune')}
          chart={{
            stacked: true,
            categories: [
              'Tribune 1',
              'Tribune 2',
              'Tribune 3',
              'Tribune 4',
              'Tribune 5',
              'Tribune 6',
              'Tribune 7',
              'Tribune 8',
              'Tribune 9',
            ],
            max: 100,
            colors: [theme.palette.primary.main, theme.palette.info.dark, theme.palette.error.dark],
            series: [
              { name: t('events.totals.tickets'), data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
              { name: t('events.totals.memberships'), data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              { name: t('events.totals.courtesy'), data: [30, 50, 70, 47, 67, 40, 37, 24, 70] },
            ],
          }}
        />
        <AnalyticBar
          title={t('events.details.montoByTribune')}
          chart={{
            stacked: false,
            categories: [
              'Tribune 1',
              'Tribune 2',
              'Tribune 3',
              'Tribune 4',
              'Tribune 5',
              'Tribune 6',
              'Tribune 7',
              'Tribune 8',
              'Tribune 9',
            ],
            max: 20000,
            colors: [theme.palette.info.main],
            series: [
              {
                name: t('events.totals.tickets'),
                data: [11236, 788, 16002, 6057, 1958, 6008, 3778, 11000, 5500],
              },
            ],
          }}
        />
        <AnalyticFunnel
          title={t('events.details.totalCapacitySalesRevenue')}
          colors={[
            theme.palette.warning.light,
            theme.palette.error.dark,

            theme.palette.success.main,
          ]}
          chartData={[
            [t('events.details.tickets'), 100],
            [t('events.details.memberships'), 80],
            [t('events.details.courtesy'), 50],
          ]}
        />
        <AnalyticPie
          title={t('events.details.paymentMethods')}
          chart={{
            colors: [
              theme.palette.info.main,
              theme.palette.warning.light,
              theme.palette.error.dark,
              theme.palette.primary.dark,
              theme.palette.success.main,
            ],
            series: [
              { label: 'Method1', value: 900 },
              { label: 'Method2', value: 3500 },
              { label: 'Method3', value: 1500 },
              { label: 'Method4', value: 1000 },
              { label: 'Method5', value: 2100 },
            ],
          }}
        />
        <AnalyticPie
          title={t('events.details.paymentChannels')}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.error.dark,
            ],
            series: [
              { label: t('events.details.web'), value: 1700 },
              { label: t('events.details.app'), value: 3500 },
              { label: t('events.details.advisors'), value: 1500 },
            ],
          }}
        />

        <AnalyticBar
          title={t('events.details.courtesies')}
          chart={{
            stacked: true,
            categories: [t('events.details.courtesies') ],
            max: 90000,
            colors: [theme.palette.success.main, theme.palette.info.main, theme.palette.error.main],
            series: [
              { name: t('events.details.ticketsGenerated'), data: [40000 ] },
              { name: t('events.details.ticketsRedeemed'), data: [17000] },
              { name: t('events.details.ticketsUnredeemed'), data: [30000,] },
            ],
            yAxisMarker: 72000,
          }}
        />
      </Box>
    </>
  );
}
