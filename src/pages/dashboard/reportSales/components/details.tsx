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
      <Box
        gap={8}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
        sx={{ mt: 2 }}
      >
        <AnalyticBar
          title={capitalizeFirtsLetter(t('sales.details.salesByTribune'))}
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
              { name: t('events.totals.tickets'), data: [13, 33, 22, 37, 67, 68, 44, 24, 16] },
              { name: t('events.totals.memberships'), data: [51, 20, 47, 67, 60, 58, 24, 34, 17] },
              { name: t('events.totals.courtesy'), data: [30, 50, 70, 47, 67, 40, 37, 24, 24] },
            ],
          }}
          loading={loading}
        />

<AnalyticBar
          title={capitalizeFirtsLetter(t('sales.details.salesTracking'))}
          isVertical
          chart={{
            stacked: true,
            categories: [
              'Event1',
              'Event 2',
              'Event 3',
              'Event 4',
              'Event 5',

            ],
            max: 200,
            colors: [theme.palette.warning.main, theme.palette.error.main, theme.palette.primary.main],
            series: [
              { name: t('events.totals.tickets'), data: [13, 33, 22, 37, 67, ] },
              { name: t('events.totals.memberships'), data: [51, 20, 47, 67, 60] },
              { name: t('events.totals.courtesy'), data: [30, 50, 70, 47, 67] },
            ],
          }}
          loading={loading}
        />

        <AnalyticPie
          title={capitalizeFirtsLetter(t('sales.details.salesByChannel'))}
          chart={{
            colors: [
        
              theme.palette.error.dark,
              theme.palette.warning.light,
              theme.palette.success.light,
            ],
            series: [
              { label: 'Channel 1', value: 900 },
              { label: 'channel 2', value: 3500 },
              { label: 'channel 3', value: 1500 },

            ],
          }}
          loading={loading}
        />
      </Box>
    </>
  );
}
