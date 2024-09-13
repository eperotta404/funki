import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import CardTotalsPayments from './card-totals-payments';
import Card2TotalsPayments from './card-2-totals-payments';

const TOTALS = [
  {
    line1: '2,000',
    line2: '1,000',
    line3: '3,693,286 (3,641,012)',
    line4: '3,000 / 4,000',
  },
  {
    line1: '1,900',
    line2: '957',
    line3: '3,693,286 (3,641,012)',
    line4: '2,857 / 4,000',
  },
];

const fundraising = '45,653';

export default function TotalsPayments() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('events.totals.totals')}</h2>
      <Box
        gap={8}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        sx={{
          mt: 2,
          '@media (min-width: 1200px) and (max-width: 1399px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        }}
      >
        <CardTotalsPayments
          title={`<strong>${t('events.totals.ticketsSold')}</strong>`}
          line1={`${t('events.totals.tickets')} : <strong>${TOTALS[0].line1}</strong>`}
          line2={`${t('events.totals.memberships')} : <strong>${TOTALS[0].line2} </strong>`}
          line3={`${t('events.totals.courtesy')} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('events.totals.total').toUpperCase()} : <strong>${TOTALS[0].line4}</strong>`}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.warning.lighterChannel}
          colorSvg="secondary.main"
        />

        <Card2TotalsPayments
          title={`<strong>${t('events.totals.fundraising')}</strong>`}
          line1={`<strong>$${t(fundraising)} </strong>`}
          color1={theme.vars.palette.error.lightChannel}
          color2={theme.vars.palette.warning.lighterChannel}
          colorSvg="success.main"
        />

        <CardTotalsPayments
          title={`<strong>${t('events.totals.ocupation')}</strong>`}
          line1={`${t('events.totals.tickets')} : <strong>${TOTALS[1].line1} </strong>`}
          line2={`${t('events.totals.memberships')} : <strong> ${TOTALS[1].line2}</strong>`}
          line3={`${t('events.totals.courtesy')} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('events.totals.total').toUpperCase()} : <strong>${TOTALS[1].line4}</strong>`}
          line5="63%"
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="error.main"
        />
      </Box>
    </>
  );
}
