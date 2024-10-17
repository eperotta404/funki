import type { User } from 'src/core/domain/models/user';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { CustomAvatar } from 'src/components/custom-avatar';

// ----------------------------------------------------------------------

type Props = {
  row: User;
  selected: boolean;
  onEditRow: () => void;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }: Props) {
  return (
    <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell width={500}>
        <Stack spacing={1} direction="row" alignItems="center">
          <CustomAvatar
            src={row.avatar}
            alt={row.email}
            name={row.email}
            sx={{ width: 40, height: 40 }}
          />
          <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
            {row.email}
          </Link>
        </Stack>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.roles.join(', ')}</TableCell>

      <TableCell>
        <Stack direction="row" alignItems="center">
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              onClick={() => {
                onEditRow();
              }}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove" placement="top" arrow>
            <IconButton
              onClick={() => {
                alert('borrar');
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
