import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import AnalyticBar from './analytic-bar';

export default function DetailsPayments() {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const l = queryParams.get('l');


  const loading = l === 'true';

  return (
    <>
      <h2>{capitalizeFirtsLetter(t('payments.details.details'))}</h2>
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
            colors: [theme.palette.warning.main],
            series: [
              {
                name: t('events.totals.tickets'),
                data: [11236, 7188, 8002, 6057, 5958, 6008, 3778, 11000, 5500],
              },
            ],
          }}
          loading={loading}
        />
      </Box>
    </>
  );
}
