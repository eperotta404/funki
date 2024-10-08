import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { CONFIG } from 'src/config-global';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Inicio - ${CONFIG.appName}` };

export default function Page() {
  const { t } = useTranslation();
  const { selectedOrganization } = useOrganization();
  const renderSelectedOde = (
    <div style={{padding: 30}}>
      <h1>Organization seleccionada</h1>
      <div>
          <p>Id: {selectedOrganization?.id}</p>
          <p>Nombre: {selectedOrganization?.name}</p>
        </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <BlankView title={t('home.title')}>
        {renderSelectedOde}
      </BlankView>
    </>
  );
}
