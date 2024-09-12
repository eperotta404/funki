import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { BlankView } from 'src/sections/blank/view';

import FiltersPayment from './components/filters-payments';

// ----------------------------------------------------------------------

const metadata = { title: `Payments| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { t } = useTranslation();
  const renderPaymentsScreen = (
    <DashboardContent maxWidth="xl">
    <Grid container spacing={3}>
        <Grid item xs={12}>
      <FiltersPayment />
        </Grid> 
    </Grid>
    </DashboardContent>
    
  );
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BlankView title={t('payments.title')} >{renderPaymentsScreen}</BlankView>
    </>
  );
}
