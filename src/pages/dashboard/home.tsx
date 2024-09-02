import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Inicio | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { selectedOrganization } = useOrganization();
  const renderSelectedOde = (
    <div>
      <h1>Organization seleccionada</h1>
      {selectedOrganization ? (
        <div>
          <p>ID: {selectedOrganization.id}</p>
          <p>Nombre: {selectedOrganization.name}</p>
          <img src={selectedOrganization.logo} alt={selectedOrganization.name} />
        </div>
      ) : (
        <p>no seleccionada</p>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <BlankView title="Inicio">
        {renderSelectedOde}
      </BlankView>
    </>
  );
}
