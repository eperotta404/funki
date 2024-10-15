import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { Card, Grid } from "@mui/material";

import { capitalizeFirtsLetter } from "src/utils/helper";

import { CONFIG } from "src/config-global";
import { DashboardContent } from "src/layouts/dashboard";

import { BlankView } from "src/sections/blank/view";

export default function Page() {
    const { t } = useTranslation();
    const metadata = { title: `Usuarios | Nuevo Usuario - ${CONFIG.appName}` };
    const cardStyle = { mt: 5, p: 3, backgroundColor: 'background.default', boxShadow: 3 };
    const renderUserCreate = (
        <DashboardContent maxWidth="xl"> 
           <Grid item xs={12}>
 
       
              <Card sx={cardStyle}>nuevo</Card>

         </Grid>
        </DashboardContent>
    )
    return (
        <>
          <Helmet>
            <title>{metadata.title}</title>
          </Helmet>
          <BlankView title={capitalizeFirtsLetter(t('users.titleCreation'))}>{renderUserCreate}</BlankView>
        </>
    );
}