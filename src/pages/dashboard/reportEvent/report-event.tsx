import type { Event } from 'src/core/domain/models/event';
import type { EventDetail } from 'src/core/domain/models/eventDetail';
import type { Organization } from 'src/core/domain/models/organization';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, Card, Grid } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { organizationService } from 'src/core/infrastructure/instances';
import { GetEventsByOrganization } from 'src/core/domain/useCases/GetEventsByOrganization';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { LoadingScreen } from 'src/components/loading-screen';

import { BlankView } from 'src/sections/blank/view';

import TotalsEvent from './components/totals-event';
import SummaryEvent from './components/summary-event';
import FiltersEvent from './components/filters-event';
import DetailsEvent from './components/details-event';
import EventNotAvailable from './components/event-not-available';

// ----------------------------------------------------------------------

const getEventsByOrgnizationUseCase = new GetEventsByOrganization(organizationService);

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
  const currentYear = new Date().getFullYear();

  const { t } = useTranslation();

  const { selectedOrganization } = useOrganization();

  const [loading, setLoading] = useState(false);

  const [teams, setTeams] = useState<FilterOption[]>([]);
  const [years, setYear] = useState<FilterOption[]>([]);
  const [events, setEvents] = useState<FilterOption[]>([]);

  const [selectedTeam, setSelectedTeam] = useState<FilterOption | null>(null);
  const [selectedYear, setSelectedYear] = useState<FilterOption | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FilterEventOption | null>(null);

  const getDatesOrganizationDropdown = (): FilterOption[] => [
    { id: (currentYear - 2).toString(), label: (currentYear - 2).toString() },
    { id: (currentYear - 1).toString(), label: (currentYear - 1).toString() },
    { id: currentYear.toString(), label: currentYear.toString() },
  ];

  const getTeamsFromOrganizationDropdown = (organization: Organization | null): FilterOption[] =>
    organization
      ? organization.squads.map((squad) => ({
          id: squad.shortName,
          label: squad.name,
        }))
      : [];

  const getEventsFromOrganization = (eventsData: Event[] | null): FilterEventOption[] =>
    eventsData
      ? eventsData.map((event, index) => ({
          id: event.id,
          label: event.name,
          details: event.details,
        }))
      : [];

  const updateFilters = (teamsData: FilterOption[], datesData: FilterOption[]): void => {
    if (teamsData.length === 0) {
      setEvents([]);
      setSelectedEvent(null);
    }
    setTeams(teamsData);
    setYear(datesData);
    setSelectedTeam(teamsData.length > 0 ? teamsData[0] : null);
    setSelectedYear({ id: currentYear.toString(), label: currentYear.toString() });
  };

  useEffect(() => {
    if (selectedOrganization) {
      const teamsData = getTeamsFromOrganizationDropdown(selectedOrganization);
      const datesData = getDatesOrganizationDropdown();
      updateFilters(teamsData, datesData);
    }
  }, [selectedOrganization]);

  useEffect(() => {
    const fetchEventByOrganization = async () => {
      setLoading(true);
      try {
        if (selectedTeam?.id && selectedYear?.id) {
          const res = await getEventsByOrgnizationUseCase.execute(selectedTeam.id, selectedYear.id);
          const eventsData = getEventsFromOrganization(res);
          setEvents(eventsData);
          setSelectedEvent(eventsData.length > 0 ? eventsData[0] : null);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedTeam && selectedYear) {
      fetchEventByOrganization();
    }
  }, [selectedTeam, selectedYear]);

  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderSelectedOde = (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FiltersEvent
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
                <SummaryEvent selectedEvent={selectedEvent} />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <TotalsEvent />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <DetailsEvent />
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
