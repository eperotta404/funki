import type { SelectChangeEvent } from '@mui/material/Select';
import type { UseSetStateReturn } from 'src/hooks/use-set-state';

import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type IUserTableFilters = {
  email: string;
  role: string[];
};

type Props = {
  onResetPage: () => void;
  filters: UseSetStateReturn<IUserTableFilters>;
  options: {
    roles: string[];
  };
};

export function UserTableToolbar({ filters, options, onResetPage }: Props) {
  const theme = useTheme();

  const handleFilterEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      filters.setState({ email: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterRole = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      filters.setState({ role: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ py: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="user-filter-role-select-label">Roles</InputLabel>
        <Select
          multiple
          value={filters.state.role}
          onChange={handleFilterRole}
          input={<OutlinedInput label="Roles" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          inputProps={{ id: 'user-filter-role-select-label' }}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 240, background: theme.vars.palette.secondary.lighter },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: theme.vars.palette.secondary.light,
              },
            },

            '& .MuiSelect-select': {
              padding: '16.5px 14px',
              backgroundColor: theme.vars.palette.secondary.lighter,
            },
          }}
        >
          {options.roles.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox disableRipple size="small" checked={filters.state.role.includes(option)} />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.vars.palette.secondary.lighter,
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: theme.vars.palette.secondary.light,
              },
            },
          }}
          fullWidth
          value={filters.state.email}
          onChange={handleFilterEmail}
          placeholder="Correo electrónico..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}
