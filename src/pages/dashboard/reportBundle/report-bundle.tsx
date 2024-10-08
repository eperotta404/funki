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

import Totals from './components/totals';
import Summary from './components/summary';
import Filters from './components/filters';
import Details from './components/details';
import EventNotAvailable from '../reportEvent/components/event-not-available';

// ----------------------------------------------------------------------

const getEventsByOrgnizationUseCase = new GetEventsByOrganization(organizationService);
const metadata = { title: `Reportes | Abonos - ${CONFIG.appName}` };

export default function Page() {
  const { t } = useTranslation();
  const { selectedOrganization } = useOrganization();
  const isBundles = true;
  const { loading, teams, years, events, selectedTeam, selectedYear, selectedEvent, setSelectedTeam, setSelectedYear, setSelectedEvent } =
    useFilterData(getEventsByOrgnizationUseCase, selectedOrganization, isBundles);

  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderBundlesScreen = (
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
                <Summary />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <Totals />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={cardStyle}>
                <Details />
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
