import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { signOut } from 'src/auth/context';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ onClose, ...other }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [checkUserSession, onClose, router]);

  return (
    <Button fullWidth variant="contained" size="large" color="inherit" onClick={handleLogout} {...other}>
      {capitalizeFirtsLetter(t('auth.logout'))}
    </Button>
  );
}
