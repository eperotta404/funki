import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useOrganization } from './context/organization-selector-context';

// ----------------------------------------------------------------------

export type OrganizationPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
  }[];
};

export function OrganizationPopover({ data = [], sx, ...other }: OrganizationPopoverProps) {
  const popover = usePopover();
  const { setSelectedOrganization } = useOrganization();

  const mediaQuery = 'sm';

  const [organization, setOrganization] = useState(data[0]);

  const handleChangeOrganization = useCallback(
    (newValue: (typeof data)[0]) => {
      setOrganization(newValue);
      setSelectedOrganization(newValue);
      popover.onClose();
    },
    [popover, setSelectedOrganization]
  );

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={popover.onOpen}
        sx={{
          py: 1,
          px: 2,
          gap: { xs: 0.5, [mediaQuery]: 1 },
          backgroundColor: 'white',
          borderRadius: 1,
          ...sx,
        }}
        {...other}
      >
        <Box
          component="img"
          alt={organization?.name}
          src={organization?.logo}
          sx={{ width: 24, height: 24, borderRadius: '50%' }}
        />

        <Box
          component="span"
          sx={{
            typography: 'subtitle2',
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          {organization?.name}
        </Box>

        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
      </ButtonBase>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-left' } }}
      >
        <MenuList sx={{ width: 240 }}>
          {data.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === organization?.id}
              onClick={() => handleChangeOrganization(option)}
              sx={{ height: 48 }}
            >
              <Avatar alt={option.name} src={option.logo} sx={{ width: 24, height: 24 }} />

              <Box component="span" sx={{ flexGrow: 1 }}>
                {option.name}
              </Box>
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
