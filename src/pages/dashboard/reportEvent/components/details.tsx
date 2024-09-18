import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import AnalyticBar from '../../components/analytic-bar';
import AnalyticPie from '../../components/analytic-pie';



export default function Details() {
  const { t } = useTranslation();
  const theme = useTheme();

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const l = queryParams.get('l');


  const loading = l === 'true';
  return (
    <>
      <h2>{capitalizeFirtsLetter(t('events.details.details'))}</h2>
      <Box
        gap={8}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        sx={{ mt: 2 }}
      >
        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.ticketsByTribune'))}
          isVertical
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
            max: 200,
            colors: [theme.palette.primary.main, theme.palette.info.dark, theme.palette.error.dark],
            series: [
              { name: t('events.totals.tickets'), data: [43, 33, 22, 37, 67, 68, 37, 24,  16] },
              { name: t('events.totals.memberships'), data: [51, 70, 47, 67, 40, 37, 24,  34, 17] },
              { name: t('events.totals.courtesy'), data: [30, 50, 70, 47, 67, 40, 37, 24,  24] },
            ],
          }}
          loading={loading}
        />
        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.montoByTribune'))}
          isVertical
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
          loading={loading}
        />

        <AnalyticPie
          title={capitalizeFirtsLetter(t('events.details.bundleMethods'))}
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
          loading={loading}
        />
        <AnalyticPie
          title={capitalizeFirtsLetter(t('events.details.bundleChannels'))}
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
          loading={loading}
        />

        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.totalCapacitySalesRevenue'))}
          isVertical={false}
          chart={{
            stacked: true,
            categories: [ "Tribune 1", "Tribune 2", "Tribune 3"],
            max: 50000,
            colors: [theme.palette.info.main, theme.palette.success.light, theme.palette.warning.main],
            series: [
              { name: t('events.details.tickets'), data: [20000, 1700, 30000] },
              { name: t('events.details.memberships'), data: [7000, 1500, 4000] },
              { name: t('events.details.courtesy'), data: [3000, 25000, 3500] },
            ],

          }}
          loading={loading}
        />

        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.courtesies'))}
          isVertical
          chart={{
            stacked: true,
            categories: [t('events.details.courtesies')],
            max: 90000,
            colors: [theme.palette.success.main, theme.palette.info.main, theme.palette.error.main],
            series: [
              { name: t('events.details.ticketsGenerated'), data: [40000] },
              { name: t('events.details.ticketsRedeemed'), data: [17000] },
              { name: t('events.details.ticketsUnredeemed'), data: [30000] },
            ],
            yAxisMarker: 72000,
          }}
          loading={loading}
        />
      </Box>
    </>
  );
}
