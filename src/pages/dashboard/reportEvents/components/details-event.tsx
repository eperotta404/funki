import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import AnalyticTicketsByTribune from './analytic-tickets-by-tribune';

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
        <AnalyticTicketsByTribune
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
            series: [
              { name: t('events.totals.tickets'), data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
              { name: t('events.totals.memberships'), data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              { name: t('events.totals.courtesy'), data: [30, 50, 70, 47, 67, 40, 37, 24, 70] },
            ],
          }}
        />
        <AnalyticTicketsByTribune
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
            series: [
              {
                name: t('events.totals.tickets'),
                data: [11236, 788, 16002, 657, 958, 6008, 3778, 14000, 5500],
              },
            ],
          }}
        />
      </Box>
    </>
  );
}