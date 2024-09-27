import type { EventSalesSummary } from 'src/core/domain/models/eventSalesSummary';

import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';
import { formatCurrency } from 'src/utils/format-currency';

import CardTotals from './card-totals';
import CardIncomeTotals from '../../components/card-income-totals';

interface SalesSummaryEventProps {
  salesSummary: EventSalesSummary | null;
  loadingSalesSummary: boolean;
}

const TOTALS = [
  {
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

export default function Totals({ salesSummary, loadingSalesSummary }: SalesSummaryEventProps) {
  const theme = useTheme();
  const { t, i18n} = useTranslation();
  const currentLocale = i18n.language;
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
        <CardTotals
          title={`<strong>${capitalizeFirtsLetter(t('events.totals.ticketsSold'))}</strong>`}
          line1={`${capitalizeFirtsLetter(t('events.totals.tickets'))} : <strong>${salesSummary?.totalSeats}</strong>`}
          line2={`${capitalizeFirtsLetter(t('events.totals.memberships'))} : <strong>${TOTALS[0].line2} </strong>`}
          line3={`${capitalizeFirtsLetter(t('events.totals.courtesy'))} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('events.totals.total').toUpperCase()} : <strong>${TOTALS[0].line4}</strong>`}
          loading={loadingSalesSummary}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="info.main"
        />

        <CardIncomeTotals
          title={`<strong>${capitalizeFirtsLetter(t('events.totals.fundraising'))}</strong>`}
          line1={`<strong>${formatCurrency(salesSummary?.totalRevenue || 0, currentLocale)} </strong>`}
          loading={loadingSalesSummary}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="info.main"
        />

        <CardTotals
          title={`<strong>${capitalizeFirtsLetter(t('events.totals.ocupation'))}</strong>`}
          line1={`${capitalizeFirtsLetter(t('events.totals.tickets'))} : <strong>${TOTALS[1].line1} </strong>`}
          line2={`${capitalizeFirtsLetter(t('events.totals.memberships'))} : <strong> ${TOTALS[1].line2}</strong>`}
          line3={`${capitalizeFirtsLetter(t('events.totals.courtesy'))} :  <strong>${TOTALS[0].line3}</strong>`}
          line4={`${t('events.totals.total').toUpperCase()} : <strong>${TOTALS[1].line4}</strong>`}
          line5="63%"
          loading={loadingSalesSummary}
          color1={theme.vars.palette.primary.lightChannel}
          color2={theme.vars.palette.primary.lighterChannel}
          colorSvg="info.main"
        />
      </Box>
    </>
  );
}
