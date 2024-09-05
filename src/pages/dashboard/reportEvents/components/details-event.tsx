import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import AnalyticBar from './analytic-bar';
import AnalyticFunnel from './analytic-funnel';

export default function DetailsEvent() {
  const { t } = useTranslation();
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
          chartData={[
            [t('events.details.tickets'), 100],
            [t('events.details.memberships'), 80],
            [t('events.details.courtesy'), 50],
          ]}
        />
      </Box>
    </>
  );
}
