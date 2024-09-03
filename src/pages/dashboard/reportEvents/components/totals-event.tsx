import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import CardTotalsEvent from './card-totals-event';

const TOTALS = [
  {
    line1: '2,000',
    line2: '1,000',
    line3: '3,000 / 4,000',
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
        sx={{ mt: 5 }}
      >
        <CardTotalsEvent
          line1={`<strong>${TOTALS[0].line1}</strong`}
          line2={`<strong>${t('events.summaryEvent.team')}: </strong>${TOTALS[0].line2}`}
          line3={`<strong>${t('events.summaryEvent.rival')}: </strong>${TOTALS[0].line3}`}
          color1={theme.vars.palette.secondary.lightChannel}
          color2={theme.vars.palette.info.lightChannel}
          colorSvg="grey.main"
        />
      </Box>
    </>
  );
}
