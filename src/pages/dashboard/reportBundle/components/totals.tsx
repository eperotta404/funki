import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import CardTotals from './card-totals';
import CardIncomeTotals from '../../components/card-income-totals';

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

export default function Totals() {
  const theme = useTheme();
  const { t } = useTranslation();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const l = queryParams.get('l');

  const loading = l === 'true';

  return (
    <>
      <h2>{capitalizeFirtsLetter(t('bundles.totals.totals'))}</h2>
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
        <CardTotals
          title={`<strong>${capitalizeFirtsLetter(t('bundles.totals.membershipsSold'))}</strong>`}
          line4={`${t('bundles.totals.total').toUpperCase()} : <strong>${TOTALS[0].line4}</strong>`}
          loading={loading}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="info.main"
        />

        <CardIncomeTotals
          title={`<strong>${capitalizeFirtsLetter(t('bundles.totals.fundraising'))}</strong>`}
          line1={`<strong>$${t(fundraising)} </strong>`}
          loading={loading}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="info.main"
        />

        <CardTotals
          title={`<strong>${capitalizeFirtsLetter(t('bundles.totals.ocupation'))}</strong>`}
          line3={`${capitalizeFirtsLetter(t('bundles.totals.courtesy'))} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('bundles.totals.total').toUpperCase()} : <strong>${TOTALS[1].line4}</strong>`}
          line5="15%"
          loading={loading}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="info.main"
        />
      </Box>
    </>
  );
}
