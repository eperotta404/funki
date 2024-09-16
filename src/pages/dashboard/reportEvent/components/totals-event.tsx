import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import CardTotalsEvent from './card-totals-event';
import Card2TotalsEvent from './card-2-totals-event';

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

export default function TotalsEvent() {
  const theme = useTheme();
  const { t } = useTranslation();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const l = queryParams.get('l');

  const loading = l === 'true';

  return (
    <>
      <h2>{capitalizeFirtsLetter(t('events.totals.totals'))}</h2>
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
        <CardTotalsEvent
          title={`<strong>${capitalizeFirtsLetter(t('events.totals.ticketsSold'))}</strong>`}
          line1={`${capitalizeFirtsLetter(t('events.totals.tickets'))} : <strong>${TOTALS[0].line1}</strong>`}
          line2={`${capitalizeFirtsLetter(t('events.totals.memberships'))} : <strong>${TOTALS[0].line2} </strong>`}
          line3={`${capitalizeFirtsLetter(t('events.totals.courtesy'))} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('events.totals.total').toUpperCase()} : <strong>${TOTALS[0].line4}</strong>`}
          loading={loading}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.warning.lighterChannel}
          colorSvg="secondary.main"
        />

        <Card2TotalsEvent
          title={`<strong>${capitalizeFirtsLetter(t('events.totals.fundraising'))}</strong>`}
          line1={`<strong>$${t(fundraising)} </strong>`}
          color1={theme.vars.palette.error.lightChannel}
          loading={loading}
          color2={theme.vars.palette.warning.lighterChannel}
          colorSvg="success.main"
        />

        <CardTotalsEvent
          title={`<strong>${capitalizeFirtsLetter(t('events.totals.ocupation'))}</strong>`}
          line1={`${capitalizeFirtsLetter(t('events.totals.tickets'))} : <strong>${TOTALS[1].line1} </strong>`}
          line2={`${capitalizeFirtsLetter(t('events.totals.memberships'))} : <strong> ${TOTALS[1].line2}</strong>`}
          line3={`${capitalizeFirtsLetter(t('events.totals.courtesy'))} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('events.totals.total').toUpperCase()} : <strong>${TOTALS[1].line4}</strong>`}
          line5="63%"
          loading={loading}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="error.main"
        />
      </Box>
    </>
  );
}
