import type { Organization } from 'src/core/domain/models/organization';
import type { Event } from 'src/core/domain/models/event';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Card, Grid } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { organizationService } from 'src/core/infrastructure/instances';
import { GetEventsByOrganization } from 'src/core/domain/useCases/GetEventsByOrganization';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { BlankView } from 'src/sections/blank/view';

import TotalsEvent from './components/totals-event';
import SummaryEvent from './components/summary-event';
import FiltersEvent from './components/filters-event';
import DetailsEvent from './components/details-event';
import EventNotAvailable from './components/event-not-available';

// ----------------------------------------------------------------------

const getEventsByOrgnizationUseCase = new GetEventsByOrganization(organizationService);

const metadata = { title: `Eventos| Dashboard - ${CONFIG.appName}` };
export interface FiltersOption {
  id: string;
  label: string;
}

export default function Page() {
  const currentYear = new Date().getFullYear();

  const { t } = useTranslation();

  const { selectedOrganization } = useOrganization();

  const [teams, setTeams] = useState<FiltersOption[]>([]);
  const [years, setYear] = useState<FiltersOption[]>([]);
  const [events, setEvents] = useState<FiltersOption[]>([]);

  const [selectedTeam, setSelectedTeam] = useState<FiltersOption | null>(null);
  const [selectedYear, setSelectedYear] = useState<FiltersOption | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FiltersOption | null>(null);

  const getDatesOrganizationDropdown = (): FiltersOption[] => [
      { id: (currentYear - 2).toString(), label: (currentYear - 2).toString() },
      { id: (currentYear - 1).toString(), label: (currentYear - 1).toString() },
      { id: currentYear.toString(), label: currentYear.toString() },
    ];

  const getTeamsFromOrganizationDropdown = (organization: Organization | null): FiltersOption[] =>
    organization
      ? organization.squads.map((squad) => ({
          id: squad.shortName,
          label: squad.name,
        }))
      : [];

  const getEventsFromOrganization = (eventsData: Event[] | null): FiltersOption[] =>
    eventsData
      ? eventsData.map((event) => ({
          id: event.id,
          label: event.name,
        }))
      : [];


  const updateFilters = (teamsData: FiltersOption[], datesData: FiltersOption[]): void => {
    if (teamsData.length === 0) {
      setEvents([]);
      setSelectedEvent(null);
    }
    setTeams(teamsData);
    setYear(datesData);
    setSelectedTeam(teamsData.length > 0 ? teamsData[0] : null);
    setSelectedYear({ id: currentYear.toString(), label: currentYear.toString() });
  }

  useEffect(() => {
    if (selectedOrganization) {
      const teamsData = getTeamsFromOrganizationDropdown(selectedOrganization);
      const datesData = getDatesOrganizationDropdown();
      updateFilters(teamsData, datesData);
    }
  }, [selectedOrganization]);


  useEffect(() => {
    const fetchEventByOrganization = async () => {
      try {
        if (selectedTeam?.id && selectedYear?.id) {
          const res = await getEventsByOrgnizationUseCase.execute(selectedTeam.id, selectedYear.id);
          const eventsData = getEventsFromOrganization(res);
          setEvents(eventsData);
          setSelectedEvent(eventsData.length > 0 ? eventsData[0] : null);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (selectedTeam && selectedYear) {
      fetchEventByOrganization();
    }
  }, [selectedTeam, selectedYear]);

  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderSelectedOde = (
    <>
      {selectedOrganization ? (
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
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <EventNotAvailable />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <SummaryEvent />
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
          </Grid>
        </DashboardContent>
      ) : (
        <EventNotAvailable />
      )}
    </>
  );

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <BlankView title={t('events.title')}>{renderSelectedOde}</BlankView>
    </>
  );
}
