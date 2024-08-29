import { Helmet } from 'react-helmet-async';

import { useFetchData } from 'src/hooks/use-fetch-data';

import { CONFIG } from 'src/config-global';
import { GetUser } from 'src/core/domain/useCases/GetUser';
import { userService } from 'src/core/infrastructure/instances';

import { AnimateAvatar } from 'src/components/animate';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Inicio | Dashboard - ${CONFIG.appName}` };
const getUserUseCase = new GetUser(userService);

export default function Page() {
  const { data, error, loading } = useFetchData(getUserUseCase, '1');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: data?.avatar, alt: data?.name },
        overlay: {
          border: 2,
          spacing: 3,
        },
      }}
    >
      {data?.name?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <BlankView title="Inicio">{renderAvatar}</BlankView>
    </>
  );
}
