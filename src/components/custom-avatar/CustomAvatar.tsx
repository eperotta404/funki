import { forwardRef } from 'react';

import { Badge, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import type { CustomAvatarProps } from './types';

// ----------------------------------------------------------------------

const getCharsAtName = (name: string) => name && name.substring(0, 2).toUpperCase(); // Cambiamos para obtener las primeras dos letras
const getColorByName = (name: string) => {
  const firstChar = name && name.charAt(0).toUpperCase();

  if (['A', 'N', 'H', 'L', 'Q'].includes(firstChar)) return 'info';
  if (['F', 'G', 'T', 'I', 'J'].includes(firstChar)) return 'error';
  if (['K', 'D', 'Y', 'B', 'O'].includes(firstChar)) return 'success';
  if (['P', 'E', 'R', 'S', 'U'].includes(firstChar)) return 'warning';
  if (['V', 'W', 'X', 'M', 'Z'].includes(firstChar)) return 'primary';

  return 'default';
};

// ----------------------------------------------------------------------

const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>(
  ({ color, name = '', BadgeProps, children, sx, ...other }, ref) => {
    const theme = useTheme();

    const charsAtName = getCharsAtName(name); // Usamos la nueva función que devuelve dos letras
    const colorByName = getColorByName(name);
    const colr = color || colorByName;

    const renderContent =
      colr === 'default' ? (
        <Avatar ref={ref} sx={sx} {...other}>
          {name && charsAtName} {/* Mostramos las dos letras */}
          {children}
        </Avatar>
      ) : (
        <Avatar
          ref={ref}
          sx={{
            color: theme.palette[colr]?.contrastText,
            backgroundColor: theme.palette[colr]?.main,
            fontWeight: theme.typography.fontWeightMedium,
            ...sx,
          }}
          {...other}
        >
          {name && charsAtName} {/* Mostramos las dos letras */}
          {children}
        </Avatar>
      );

    return BadgeProps ? (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        {...BadgeProps}
      >
        {renderContent}
      </Badge>
    ) : (
      renderContent
    );
  }
);

export default CustomAvatar;
