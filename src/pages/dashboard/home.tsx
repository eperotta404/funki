import { Helmet } from 'react-helmet-async';

import { useGetUser } from 'src/hooks/use-get-user';

import { CONFIG } from 'src/config-global';

import { AnimateAvatar } from 'src/components/animate';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Inicio | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { user, loading } = useGetUser('1');

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user?.avatar, alt: user?.name },
        overlay: {
          border: 2,
          spacing: 3,
        },
      }}
    >
      {user?.name?.charAt(0).toUpperCase()}
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
