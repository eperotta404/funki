import type { EventPaidMethods } from 'src/core/domain/models/eventPaidMethod';
import type { EventSalesByStand } from 'src/core/domain/models/eventSalesByStand';
import type { EventSaleChannels } from 'src/core/domain/models/eventSaleChannels';
import type { EventTicketsByStand } from 'src/core/domain/models/eventTicketsByStand';

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
  loadingTicketsByStand: boolean;
  loadingSalesByStand: boolean;
  loadingPaidMethods: boolean;
  loadingSaleChannels: boolean;
}

export default function Details({
  ticketsByStand,
  salesByStand,
  paidMethods,
  saleChannels,
  loadingTicketsByStand,
  loadingSalesByStand,
  loadingPaidMethods,
  loadingSaleChannels,
}: TicketsByStandEventProps) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const currentLocale = i18n.language;

  const colorPalette = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.secondary.main,
    theme.palette.primary.main,
    theme.palette.warning.lighter,
    theme.palette.info.lighterChannel,
  ];

  const getColorsForSeries = (seriesCount: number): string[] => colorPalette.slice(0, seriesCount);

  console.log(ticketsByStand);
  console.log(salesByStand);
  console.log(paidMethods);
  console.log(saleChannels);

  return (
    <>
      <h2>{capitalizeFirtsLetter(t('events.details.details'))}</h2>
      {ticketsByStand && ticketsByStand.categories.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <AnalyticBar
            title={capitalizeFirtsLetter(t('events.details.ticketsByTribune'))}
            isVertical
            currentLocale={currentLocale}
            chart={{
              stacked: true,
              categories: ticketsByStand?.categories,
              max: ticketsByStand?.max,
              colors: getColorsForSeries(ticketsByStand?.series?.length || 0),
              series: ticketsByStand?.series,
            }}
            loading={loadingTicketsByStand}
          />
        </Box>
      )}
      {salesByStand && salesByStand.categories.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <AnalyticBar
            title={capitalizeFirtsLetter(t('events.details.montoByTribune'))}
            isVertical
            currentLocale={currentLocale}
            money
            chart={{
              stacked: false,
              categories: salesByStand?.categories,
              max: salesByStand?.max,
              colors: getColorsForSeries(salesByStand?.series?.length || 0),
              series: salesByStand?.series?.map((serie) => ({
                ...serie,
                name: capitalizeFirtsLetter(t(serie.name)),
              })),
            }}
            loading={loadingSalesByStand}
          />
        </Box>
      )}
      {paidMethods && paidMethods.series.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <AnalyticPie
            title={capitalizeFirtsLetter(t('events.details.bundleMethods'))}
            chart={{
              colors: getColorsForSeries(paidMethods?.series?.length || 0),
              series: paidMethods.series,
            }}
            loading={loadingPaidMethods}
          />
        </Box>
      )}
      {saleChannels && saleChannels.series.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <AnalyticPie
            title={capitalizeFirtsLetter(t('events.details.bundleChannels'))}
            chart={{
              colors: getColorsForSeries(paidMethods?.series?.length || 0),
              series: saleChannels.series,
            }}
            loading={loadingSaleChannels}
          />
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.totalCapacitySalesRevenue'))}
          isVertical={false}
          currentLocale={currentLocale}
          chart={{
            stacked: true,
            categories: [
              capitalizeFirtsLetter(t('events.details.capacity')),
              capitalizeFirtsLetter(t('events.details.sales')),
              capitalizeFirtsLetter(t('events.details.income')),
            ],
            max: 50000,
            colors: [
              theme.palette.info.main,
              theme.palette.success.light,
              theme.palette.warning.main,
            ],
            series: [
              {
                name: capitalizeFirtsLetter(t('events.details.tickets')),
                data: [20000, 1700, 30000],
              },
              {
                name: capitalizeFirtsLetter(t('events.details.memberships')),
                data: [7000, 1500, 4000],
              },
              {
                name: capitalizeFirtsLetter(t('events.details.courtesy')),
                data: [3000, 25000, 3500],
              },
            ],
          }}
          loading={false}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <AnalyticBar
          title={capitalizeFirtsLetter(t('events.details.courtesies'))}
          isVertical
          currentLocale={currentLocale}
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
          loading={false}
        />
      </Box>
    </>
  );
}
