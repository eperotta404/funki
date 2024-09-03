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

// ----------------------------------------------------------------------

const metadata = { title: `Eventos| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { t } = useTranslation();
  const { selectedOrganization } = useOrganization();

  const renderSelectedOde = (
    <>
      {selectedOrganization ? (
        <DashboardContent maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FiltersEvent />
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ p: 3, backgroundColor: 'background.default', boxShadow: 3 }}>
                <SummaryEvent />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ p: 3, backgroundColor: 'background.default', boxShadow: 3 }}>
                <TotalsEvent />
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
