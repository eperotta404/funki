import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import CardTotalsEvent from './card-totals-event';

const TOTALS = [
  {
    line1: '2,000',
    line2: '1,000',
    line3: '3,000 / 4,000',
  },
  {
    line1: '1,900',
    line2: '957',
    line3: '2,857 / 4,000',
  },
];

export default function TotalsEvent() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <h2>Totals</h2>
      <Box
        gap={8}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        sx={{ mt: 2 }}
      >
        <CardTotalsEvent
          title={`<strong>${t('events.totals.ticketsSold')}</strong>`}
          line1={`<strong>${t('events.totals.tickets')} :  </strong>${TOTALS[0].line1}`}
          line2={`<strong>${t('events.totals.abonos')} :  </strong>${TOTALS[0].line2}`}
          line3={`<strong>${t('events.totals.total').toUpperCase()} : </strong>${TOTALS[0].line3}`}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.warning.lighterChannel}
          colorSvg="secondary.main"
        />
        <CardTotalsEvent
          title={`<strong>${t('events.totals.ocupation')}</strong>`}
          line1={`<strong>${t('events.totals.tickets')} :  </strong>${TOTALS[1].line1}`}
          line2={`<strong>${t('events.totals.abonos')} :  </strong>${TOTALS[1].line2}`}
          line3={`<strong>${t('events.totals.total').toUpperCase()} : </strong>${TOTALS[1].line3}`}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="error.main"
        />
      </Box>
    </>
  );
}
