import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Card, Grid } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { BlankView } from 'src/sections/blank/view';

import { UserNewEditForm } from './user-new-edit-form';

export default function Page() {
  const { t } = useTranslation();
  const metadata = { title: `Usuarios | Nuevo Usuario - ${CONFIG.appName}` };
  const renderUserCreate = (
    <DashboardContent maxWidth="xl">
      <Grid item xs={12} sx={{ mt: 5 }}>
        <UserNewEditForm />
      </Grid>
    </DashboardContent>
  );
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <BlankView title={capitalizeFirtsLetter(t('users.titleCreation'))}>
        {renderUserCreate}
      </BlankView>
    </>
  );
}
