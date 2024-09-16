import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Card, Grid } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { BlankView } from 'src/sections/blank/view';

import TotalsBundle from './components/totals-bundle';
import FiltersBundle from './components/filters-bundle';
import SummaryBundle from './components/summary-bundle';
import DetailsBundle from './components/details-bundle';

// ----------------------------------------------------------------------

const metadata = { title: `Bundles| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { t } = useTranslation();

  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderBundlesScreen = (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FiltersBundle />
        </Grid>
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
