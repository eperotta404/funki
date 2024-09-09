import type { Organization } from 'src/core/domain/models/organization';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Card, Grid } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { BlankView } from 'src/sections/blank/view';

import TotalsEvent from './components/totals-event';
import SummaryEvent from './components/summary-event';
import FiltersEvent from './components/filters-event';
import DetailsEvent from './components/details-event';

// ----------------------------------------------------------------------

const datesMock = [
  { id: '1', label: '24/9/2024' },
  { id: '2', label: '23/5/2024' },
];

const eventsMock = [
  { id: '1', label: 'Evento 1' },
  { id: '2', label: 'Evento 2' },
];

// const getEventsByOrgnizationUseCase = new GetEventsByOrganization(organizationService);

const metadata = { title: `Eventos| Dashboard - ${CONFIG.appName}` };
interface FiltersOption {
  id: string;
  label: string;
}

export default function Page() {
  const { t } = useTranslation();

  const { selectedOrganization } = useOrganization();

  const [teams, setTeams] = useState<FiltersOption[]>([]);
  const [events, setEvents] = useState<FiltersOption[]>(eventsMock);

  const [selectedTeam, setSelectedTeam] = useState<FiltersOption | null>(null);

  const getTeamsFromOrganization = (organization: Organization | null): FiltersOption[] => organization ? organization.squads.map(squad => ({
      id: squad.id,
      label: squad.name,
    })) : [];

  useEffect(() => {
    if (selectedOrganization) {
      const teamsData = getTeamsFromOrganization(selectedOrganization);
      setTeams(teamsData);
      setSelectedTeam(teamsData.length > 0 ? teamsData[0] : null);

      const fetchEventByOrganization = async () => {
        try {
          // const res = await getEventsByOrgnizationUseCase.execute(selectedOrganization.id, teamsData[0]?.id);
          // if (res.length > 0) {
          //   setEvents(res);
          // }
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchEventByOrganization();
    }
  }, [selectedOrganization]);

  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderSelectedOde = (
    <>
      {selectedOrganization ? (
        <DashboardContent maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FiltersEvent teams={teams} dates={datesMock} events={events} selectedTeam={selectedTeam}/>
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
        <p>No seleccionada</p>
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
