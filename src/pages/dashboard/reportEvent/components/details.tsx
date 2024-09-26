import type { EventPaidMethods } from 'src/core/domain/models/eventPaidMethod';
import type { EventSalesByStand } from 'src/core/domain/models/eventSalesByStand';
import type { EventSaleChannels } from 'src/core/domain/models/eventSaleChannels';
import type { EventTicketsByStand } from 'src/core/domain/models/eventTicketsByStand';

import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Box, useTheme } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import AnalyticBar from '../../components/analytic-bar';
import AnalyticPie from '../../components/analytic-pie';

interface TicketsByStandEventProps {
  ticketsByStand: EventTicketsByStand | null;
  salesByStand: EventSalesByStand | null;
  paidMethods: EventPaidMethods | null;
  saleChannels: EventSaleChannels | null;
}

export default function Details({ ticketsByStand, salesByStand, paidMethods, saleChannels }: TicketsByStandEventProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const l = queryParams.get('l');

  const loading = l === 'true';
  const colorPalette = [
    theme.palette.info.main,
    theme.palette.warning.light,
    theme.palette.error.dark,
    theme.palette.primary.dark,
    theme.palette.success.main,
];

  function getColorsForSeries(seriesCount: number): string[] {
    return colorPalette.slice(0, seriesCount);
  }

  console.log(ticketsByStand);
  console.log(salesByStand);
  console.log(paidMethods);
  console.log(saleChannels);
  return (
    <>
      <h2>{capitalizeFirtsLetter(t('events.details.details'))}</h2>
      <Box
        gap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
        sx={{ mt: 2 }}
      >
        {ticketsByStand && ticketsByStand.categories.length > 0 &&
          <AnalyticBar
            title={capitalizeFirtsLetter(t('events.details.ticketsByTribune'))}
            isVertical
            chart={{
              stacked: true,
              categories: ticketsByStand?.categories,
              max: ticketsByStand?.max,
              colors: getColorsForSeries(ticketsByStand?.series?.length || 0),
              series: ticketsByStand?.series,
            }}
            loading={loading}
          />
        }
        {salesByStand && salesByStand.categories.length > 0 &&
          <AnalyticBar
            title={capitalizeFirtsLetter(t('events.details.montoByTribune'))}
            isVertical
            money
            chart={{
              stacked: false,
              categories: salesByStand?.categories,
              max: salesByStand?.max,
              colors: getColorsForSeries(salesByStand?.series?.length || 0),
              series:  salesByStand?.series,
            }}
            loading={loading}
          />
        }
      </Box>
      <Box
        gap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        sx={{ mt: 2 }}
      >
        {paidMethods && paidMethods.series.length > 0 &&
          <AnalyticPie
            title={capitalizeFirtsLetter(t('events.details.bundleMethods'))}
            chart={{
              colors: getColorsForSeries(paidMethods?.series?.length || 0),
              series: paidMethods.series
            }}
            loading={loading}
          />}
          {saleChannels && saleChannels.series.length > 0 &&
            <AnalyticPie
              title={capitalizeFirtsLetter(t('events.details.bundleChannels'))}
              chart={{
                colors: getColorsForSeries(paidMethods?.series?.length || 0),
              series: saleChannels.series
              }}
              loading={loading}
            />}
      </Box>
      <Box
        gap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
        sx={{ mt: 2 }}
      >
        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.totalCapacitySalesRevenue'))}
          isVertical={false}
          chart={{
            stacked: true,
            categories: [capitalizeFirtsLetter(t('events.details.capacity')), capitalizeFirtsLetter(t('events.details.sales')), capitalizeFirtsLetter(t('events.details.income'))],
            max: 50000,
            colors: [
              theme.palette.info.main,
              theme.palette.success.light,
              theme.palette.warning.main,
            ],
            series: [
              { name: capitalizeFirtsLetter( t('events.details.tickets')), data: [20000, 1700, 30000] },
              { name: capitalizeFirtsLetter(t('events.details.memberships')), data: [7000, 1500, 4000] },
              { name: capitalizeFirtsLetter(t('events.details.courtesy')), data: [3000, 25000, 3500] },
            ],
          }}
          loading={loading}
        />

        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.courtesies'))}
          isVertical
          chart={{
            stacked: true,
            categories: [capitalizeFirtsLetter(t('events.details.courtesies'))],
            max: 90000,
            colors: [theme.palette.success.main, theme.palette.info.main, theme.palette.error.main],
            series: [
              { name: capitalizeFirtsLetter(t('events.details.ticketsGenerated')), data: [40000] },
              { name: capitalizeFirtsLetter(t('events.details.ticketsRedeemed')), data: [17000] },
              { name: capitalizeFirtsLetter(t('events.details.ticketsUnredeemed')), data: [30000] },
            ],
            yAxisMarker: 72000,
          }}
          loading={loading}
        />
      </Box>
    </>
  );
}
