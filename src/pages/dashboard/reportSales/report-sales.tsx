import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Card, Grid } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { BlankView } from 'src/sections/blank/view';

import Details from './components/details';
import TableSales from './components/table-sales';

// ----------------------------------------------------------------------

const metadata = { title: `Sales | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { t } = useTranslation();
  const cardStyle = { p: 3, backgroundColor: 'background.default', boxShadow: 3 };
  const renderSelectedOde = (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ mt: 5 }}>
          <Card sx={cardStyle}>
            <TableSales />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <Details />
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

      <BlankView title={capitalizeFirtsLetter(t('sales.title'))}>{renderSelectedOde}</BlankView>
    </>
  );
}
