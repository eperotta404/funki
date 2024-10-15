import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';

import IconButton from '@mui/material/IconButton';

// Importamos tu componente CustomAvatar

import { varHover } from 'src/components/animate';
import { CustomAvatar } from 'src/components/custom-avatar';

// ----------------------------------------------------------------------

export type AccountButtonProps = {
  photoURL: string;
  displayName: string;
} & IconButtonProps;

export function AccountButton({ photoURL, displayName, sx, ...other }: AccountButtonProps) {

  return (
    <IconButton
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(1.05)}
      sx={{ p: 0, ...sx }}
      {...other}
    >
      <CustomAvatar
        src={photoURL}
        alt={displayName}
        name={displayName}
        sx={{ width: 40, height: 40 }}
      />
    </IconButton>
  );
}
