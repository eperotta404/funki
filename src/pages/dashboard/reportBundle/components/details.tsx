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
      <h2>{capitalizeFirtsLetter(t('bundles.details.details'))}</h2>
      <Box sx={{ mt: 2 }}>
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
            colors: [theme.palette.info.main, theme.palette.success.main, theme.palette.error.main],
            series: [
              {
                name: capitalizeFirtsLetter(t('events.totals.tickets')),
                data: [13, 33, 22, 37, 67, 68, 44, 24, 16],
              },
              {
                name: capitalizeFirtsLetter(t('events.totals.memberships')),
                data: [51, 20, 47, 67, 60, 58, 24, 34, 17],
              },
              {
                name: capitalizeFirtsLetter(t('events.totals.courtesy')),
                data: [30, 50, 70, 47, 67, 40, 37, 24, 24],
              },
            ],
          }}
          loading={loading}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.montoByTribune'))}
          isVertical
          money
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
            colors: [theme.palette.warning.main],
            series: [
              {
                name: capitalizeFirtsLetter(t('events.totals.tickets')),
                data: [11236, 7188, 8002, 6057, 5958, 6008, 3778, 11000, 5500],
              },
            ],
          }}
          loading={loading}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
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
      </Box>
      <Box sx={{ mt: 2 }}>
        <AnalyticPie
          title={capitalizeFirtsLetter(t('events.details.bundleChannels'))}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.error.dark,
            ],
            series: [
              { label: capitalizeFirtsLetter(t('events.details.web')), value: 1700 },
              { label: capitalizeFirtsLetter(t('events.details.app')), value: 3500 },
              { label: capitalizeFirtsLetter(t('events.details.advisors')), value: 1500 },
            ],
          }}
          loading={loading}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <AnalyticBar
          title={capitalizeFirtsLetter(t('bundles.details.seassonBundle'))}
          isVertical={false}
          chart={{
            stacked: true,
            categories: ['Tribune 1', 'Tribune 2', 'Tribune 3'],
            max: 50000,
            colors: [
              theme.palette.info.main,
              theme.palette.success.light,
              theme.palette.warning.main,
            ],
            series: [
              {
                name: capitalizeFirtsLetter(t('events.details.tickets')),
                data: [20000, 1700, 30000],
              },
              {
                name: capitalizeFirtsLetter(t('events.details.memberships')),
                data: [7000, 1500, 4000],
              },
              {
                name: capitalizeFirtsLetter(t('events.details.courtesy')),
                data: [3000, 25000, 3500],
              },
            ],
          }}
          loading={loading}
        />
      </Box>
    </>
  );
}
