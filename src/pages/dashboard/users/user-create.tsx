import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { capitalizeFirtsLetter } from "src/utils/helper";

import { CONFIG } from "src/config-global";

import { BlankView } from "src/sections/blank/view";

export default function Page() {
    const { t } = useTranslation();
    const metadata = { title: `Usuarios | Nuevo Usuario - ${CONFIG.appName}` };

    const renderUserCreate = (
        <>
         
        </>
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