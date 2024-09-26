import type { EventDetail } from 'src/core/domain/models/eventDetail'
import type { EventPaidMethods } from 'src/core/domain/models/eventPaidMethod';
import type { EventSalesSummary } from 'src/core/domain/models/eventSalesSummary';
import type { EventSalesByStand } from 'src/core/domain/models/eventSalesByStand';
import type { EventSaleChannels } from 'src/core/domain/models/eventSaleChannels';
import type { EventTicketsByStand } from 'src/core/domain/models/eventTicketsByStand';

import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Card, Grid } from '@mui/material';

import { useFilterData } from 'src/hooks/use-filter-data';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { GetEventPaidMethods } from 'src/core/domain/useCases/GetEventPaidMethods';
import { GetEventSalesSummary } from 'src/core/domain/useCases/GetEventSalesSummary';
import { GetEventSalesByStand } from 'src/core/domain/useCases/GetEventSalesByStand';
import { eventService, organizationService } from 'src/core/infrastructure/instances';
import { GetEventSalesChannels } from 'src/core/domain/useCases/GetEventSaleChannels';
import { GetEventTicketsByStand } from 'src/core/domain/useCases/GetEventTicketsByStand';
import { GetEventsByOrganization } from 'src/core/domain/useCases/GetEventsByOrganization';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { LoadingScreen } from 'src/components/loading-screen';

import { BlankView } from 'src/sections/blank/view';

import Totals from './components/totals';
import Summary from './components/summary';
import Filters from './components/filters';
import Details from './components/details';
import EventNotAvailable from './components/event-not-available';
// ----------------------------------------------------------------------

const getEventsByOrgnizationUseCase = new GetEventsByOrganization(organizationService);
const getEventSalesSummaryUseCase = new GetEventSalesSummary(eventService);
const getEventTicketByStandUseCase = new GetEventTicketsByStand(eventService);
const getEventSalesByStandUseCase = new GetEventSalesByStand(eventService);
const getEventPaidMethodsUseCase = new GetEventPaidMethods(eventService);
const getEventSaleChannelsUseCase = new GetEventSalesChannels(eventService);

const metadata = { title: `Eventos| Dashboard - ${CONFIG.appName}` };
export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterEventOption {
  id: string;
  label: string;
  details: EventDetail;
}

export default function Page() {
  const { t } = useTranslation();
  const { selectedOrganization } = useOrganization();
  const { loading, teams, years, events, selectedTeam, selectedYear, selectedEvent, setSelectedTeam, setSelectedYear, setSelectedEvent } =
  useFilterData(getEventsByOrgnizationUseCase, selectedOrganization, 'event');

  const [salesSummary, setSalesSummary] = useState<EventSalesSummary | null>(null);
  const [ticketsByStand, setTicketsByStand] = useState<EventTicketsByStand | null>(null);
  const [salesByStand, setSalesByStand] = useState<EventSalesByStand | null>(null);
  const [paidMethods, setPaidMethods] = useState<EventPaidMethods | null>(null);
  const [saleChannels, setSaleChannels] = useState<EventSaleChannels | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      const getEventSalesSummary = async () => {
        try {
          const summary = await getEventSalesSummaryUseCase.execute(selectedEvent.details.code);
          setSalesSummary(summary);
        } catch (error) {
          console.error('Error fetching sales summary:', error);
        }
      };

      const getEventTicketsByStand = async () => {
        try {
          const tickets = await getEventTicketByStandUseCase.execute(selectedEvent.details.code);
          setTicketsByStand(tickets);
        } catch (error) {
          console.error('Error fetching tickets by stand:', error);
        }
      };

      const getEventSalesByStand = async () => {
        try {
          const sales = await getEventSalesByStandUseCase.execute(selectedEvent.details.code);
          setSalesByStand(sales);
        } catch (error) {
          console.error('Error fetching sales by stand:', error);
        }
      };

      const getEventPaidMethods = async () => {
        try {
          const paidMeth = await getEventPaidMethodsUseCase.execute(selectedEvent.details.code);
          setPaidMethods(paidMeth);
        } catch (error) {
          console.error('Error fetching paid methods:', error);
        }
      };

      const getEventSaleChannels = async () => {
        try {
          const saleChan = await getEventSaleChannelsUseCase.execute(selectedEvent.details.code);
          setSaleChannels(saleChan);
        } catch (error) {
          console.error('Error fetching sale channels:', error);
        }
      };

      getEventSalesSummary();
      getEventTicketsByStand();
      getEventSalesByStand();
      getEventPaidMethods();
      getEventSaleChannels();
    }
  }, [selectedEvent]);

  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderSelectedOde = (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Filters
            teams={teams}
            years={years}
            events={events}
            selectedTeam={selectedTeam}
            selectedYear={selectedYear}
            selectedEvent={selectedEvent}
            onTeamChange={setSelectedTeam}
            onYearChange={setSelectedYear}
            onEventChange={setSelectedEvent}
          />
        </Grid>

        {loading ? (
          <Grid item xs={12} textAlign="center">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
              }}
            >
              <LoadingScreen />
            </Box>
          </Grid>
        ) : selectedOrganization && selectedEvent ? (
          <>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <Summary selectedEvent={selectedEvent} />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <Totals salesSummary={salesSummary}/>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <Details ticketsByStand={ticketsByStand} salesByStand={salesByStand} paidMethods={paidMethods} saleChannels={saleChannels}/>
              </Card>
            </Grid>
          </>
        ) : (
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <EventNotAvailable />
              </Card>
            </Grid>
        )}
      </Grid>
    </DashboardContent>
  );

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <BlankView title={capitalizeFirtsLetter(t('events.title'))}>{renderSelectedOde}</BlankView>
    </>
  );
}
