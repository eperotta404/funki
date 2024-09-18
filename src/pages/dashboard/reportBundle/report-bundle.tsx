import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, Card, Grid } from '@mui/material';

import { useFilterData } from 'src/hooks/use-filter-data';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { organizationService } from 'src/core/infrastructure/instances';
import { GetEventsByOrganization } from 'src/core/domain/useCases/GetEventsByOrganization';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { LoadingScreen } from 'src/components/loading-screen';

import { BlankView } from 'src/sections/blank/view';

import TotalsBundle from './components/totals-bundle';
import FiltersBundle from './components/filters-bundle';
import SummaryBundle from './components/summary-bundle';
import DetailsBundle from './components/details-bundle';
import EventNotAvailable from '../reportEvent/components/event-not-available';

// ----------------------------------------------------------------------

const getEventsByOrgnizationUseCase = new GetEventsByOrganization(organizationService);
const metadata = { title: `Bundles| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { t } = useTranslation();
  const { selectedOrganization } = useOrganization();
  const { loading, teams, years, events, selectedTeam, selectedYear, selectedEvent, setSelectedTeam, setSelectedYear, setSelectedEvent } =
    useFilterData(getEventsByOrgnizationUseCase, selectedOrganization, 'buble');

  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderBundlesScreen = (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FiltersBundle
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
                <SummaryBundle />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <TotalsBundle />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <DetailsBundle />
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
        <title> {metadata.title}</title>
      </Helmet>

      <BlankView title={capitalizeFirtsLetter(t('bundles.title'))}>
        {renderBundlesScreen}
      </BlankView>
    </>
  );
}
