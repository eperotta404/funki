import type { User } from 'src/core/domain/models/user';

import { Box, Card, Table, TableBody } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { UserTableRow } from './user-table-row';
import { UserTableToolbar } from './user-table-toolbar';
import { UserTableFiltersResult } from './user-table-filters-result';

interface UserTableProps {
  tableData: User[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string, email: string) => void;
}

const TABLE_HEAD = [
  { id: 'email', label: 'Correo electrónico' },
  { id: 'role', label: 'Roles' },
  { id: '', label: 'Acciones', width: 150 },
];

type IUserTableFilters = {
  email: string;
  role: string[];
};

export default function UsersTable(props: UserTableProps) {
  const { tableData, onEdit, onDelete } = props;

  const table = useTable();
  const filters = useSetState<IUserTableFilters>({ email: '', role: [] });


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const canReset = !!filters.state.email || filters.state.role.length > 0;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const cardStyle = { mt: 5, p: 3, backgroundColor: 'background.default', boxShadow: 3 };
  return (
    <Scrollbar>
      <Card sx={cardStyle}>
        <UserTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          options={{ roles: ['SUPER_ADMIN', 'SO_ADMIN', 'SO_ASSISTANT'] }}
        />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ py: 2.5, pt: 0 }}
          />
        )}
        <Box sx={{ overflowX: 'auto' }}>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onDeleteRow={() => onDelete(row.id, row.email)}
                    onEditRow={() => onEdit(row.id)}
                  />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Box>
      </Card>
    </Scrollbar>
  );
}

type ApplyFilterProps = {
  inputData: any[];
  filters: any;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { email, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (email) {
    inputData = inputData.filter(
      (user) => user.email.toLowerCase().indexOf(email.toLowerCase()) !== -1
    );
  }

  if (role.length) {
    
    inputData = inputData.filter((user) =>
      user.roles.some((userRole: string) => role.includes(userRole))
    );
    
  }

  return inputData;
}
