import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, Grid } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { BlankView } from 'src/sections/blank/view';

export default function Page() {

  const metadata = { title: `Usuarios | Listado - ${CONFIG.appName}` };

  const loading = false;
  const users: string[] = [];
  const { t } = useTranslation();
  const renderUserList = (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
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
        ) : users ? (
          <Grid item xs={12}>
            <p>text</p>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <p>error </p>
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
      <BlankView title={capitalizeFirtsLetter(t('users.title'))}>{renderUserList}</BlankView>
    </>
  );
}
