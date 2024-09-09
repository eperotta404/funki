import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { Organization } from 'src/core/domain/models/organization';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';

import { organizationService } from 'src/core/infrastructure/instances';
import { GetOrganizations } from 'src/core/domain/useCases/GetOrganizations';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useOrganization } from './context/organization-selector-context';

// ----------------------------------------------------------------------

const getOrganizationsUseCase = new GetOrganizations(organizationService);

export function OrganizationPopover({ sx }: ButtonBaseProps) {
  const mediaQuery = 'sm';
  const popover = usePopover();

  const { setSelectedOrganization, selectedOrganization } = useOrganization();

  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await getOrganizationsUseCase.execute();
        if (res.length > 0) {
          setOrganizations(res);
          setSelectedOrganization(res[0]);
         }
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrganization();
  }, []);

  const handleChangeOrganization = useCallback(
    (newValue: (typeof organizations)[0]) => {
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
      >
        <Box
          component="img"
          alt={selectedOrganization?.name}
          src={selectedOrganization?.logo}
          sx={{ width: 24, height: 24, borderRadius: '50%' }}
        />

        <Box
          component="span"
          sx={{
            typography: 'subtitle2',
          }}
        >
          {selectedOrganization?.name}
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
          {organizations.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === selectedOrganization?.id}
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
