import type { EventDetail } from 'src/core/domain/models/eventDetail'
import type { EventSalesSummary } from 'src/core/domain/models/eventSalesSummary';
import type { EventTicketsByStand } from 'src/core/domain/models/eventTicketsByStand';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, Card, Grid } from '@mui/material';

import { useFilterData } from 'src/hooks/use-filter-data';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { GetEventSalesSummary } from 'src/core/domain/useCases/GetEventSalesSummary';
import { eventService, organizationService } from 'src/core/infrastructure/instances';
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

      getEventSalesSummary();
      getEventTicketsByStand();
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
                <Details ticketsByStand={ticketsByStand}/>
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
