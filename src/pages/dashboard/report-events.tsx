import { Helmet } from 'react-helmet-async';

import { Grid } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import DetailEvent from 'src/layouts/components/detail-event';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Eventos| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { selectedOrganization } = useOrganization();
  const renderSelectedOde = (
    <>

      {selectedOrganization ? (
         <DashboardContent maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DetailEvent/>
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
      <BlankView title="Eventos">{renderSelectedOde}</BlankView>
    </>
  );
}
