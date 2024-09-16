import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import CardTotalsPayments from './card-totals-payments';
import Card2TotalsPayments from './card-2-totals-payments';

const TOTALS = [
  {

    line3: '1,500',
    line4: '4,000 / 35,000',
  },
  {
    line3: '1,500',
    line4: '5,500 / 35,000',
  },
];

const fundraising = '1,354,245';

export default function TotalsPayments() {
  const theme = useTheme();
  const { t } = useTranslation();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const l = queryParams.get('l');

  const loading = l === 'true';

  return (
    <>
      <h2>{capitalizeFirtsLetter(t('payments.totals.totals'))}</h2>
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
          title={`<strong>${capitalizeFirtsLetter(t('payments.totals.membershipsSold'))}</strong>`}

          line4={`${t('payments.totals.total').toUpperCase()} : <strong>${TOTALS[0].line4}</strong>`}
          loading={loading}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.warning.lighterChannel}
          colorSvg="secondary.main"
        />

        <Card2TotalsPayments
          title={`<strong>${capitalizeFirtsLetter(t('payments.totals.fundraising'))}</strong>`}
          line1={`<strong>$${t(fundraising)} </strong>`}
          loading={loading}
          color1={theme.vars.palette.error.lightChannel}
          color2={theme.vars.palette.warning.lighterChannel}
          colorSvg="success.main"
        />

        <CardTotalsPayments
          title={`<strong>${capitalizeFirtsLetter(t('payments.totals.ocupation'))}</strong>`}
          line3={`${capitalizeFirtsLetter(t('payments.totals.courtesy'))} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('payments.totals.total').toUpperCase()} : <strong>${TOTALS[1].line4}</strong>`}
          line5="15%"
          loading={loading}  
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="error.main"
        />
      </Box>
    </>
  );
}
