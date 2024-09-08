import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';

import NoSsr from '@mui/material/NoSsr';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from 'src/theme/styles';

import { varHover, AnimateAvatar } from 'src/components/animate';

// ----------------------------------------------------------------------

export type AccountButtonProps = IconButtonProps & {
  photoURL: string;
  displayName: string;
};

export function AccountButton({ photoURL, displayName, sx, ...other }: AccountButtonProps) {
  const theme = useTheme();

  const renderFallback = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: photoURL, alt: displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {displayName?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <IconButton
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(1.05)}
      sx={{ p: 0, ...sx }}
      {...other}
    >
      <NoSsr fallback={renderFallback}>
        <AnimateAvatar
          slotProps={{
            avatar: { src: photoURL, alt: displayName },
            overlay: {
              border: 1,
              spacing: 2,
              color: `conic-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main})`,
            },
          }}
        >
          {displayName?.charAt(0).toUpperCase()}
        </AnimateAvatar>
      </NoSsr>
    </IconButton>
  );
}
