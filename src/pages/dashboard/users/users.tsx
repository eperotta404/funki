import type { User } from 'src/core/domain/models/user';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, Card, Grid, Table, TableBody } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';
import { useFetchData } from 'src/hooks/use-fetch-data';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { userService } from 'src/core/infrastructure/instances';
import { GetUsers } from 'src/core/domain/useCases/users/GetUsers';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { Scrollbar } from 'src/components/scrollbar';
import { LoadingScreen } from 'src/components/loading-screen';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { BlankView } from 'src/sections/blank/view';

import { UserTableRow } from './user-table-row';

type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

const getUsersUseCase = new GetUsers(userService);

export default function Page() {
  const { t } = useTranslation();
  const { selectedOrganization } = useOrganization();
  const table = useTable();
  const metadata = { title: `Usuarios | Listado - ${CONFIG.appName}` };
  const users: string[] = [];

  const { data, loading } = useFetchData(getUsersUseCase, selectedOrganization?.id);

  const TABLE_HEAD = [
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role'},
    { id: '', width: 88 },
  ];

  const [tableData, setTableData] = useState<User[]>(data || []);
  const filtersState = useSetState<IUserTableFilters>({ name: '', role: [], status: 'all' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filtersState.state,
  });

  const canReset =
    !!filtersState.state.name ||
    filtersState.state.role.length > 0 ||
    filtersState.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const cardStyle = { mt: 5, p: 3, backgroundColor: 'background.default', boxShadow: 3 };

  const renderUserList = (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12} textAlign="center">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
              }}
            >
              <LoadingScreen />
            </Box>
          </Grid>
        ) : users ? (
          <Grid item xs={12}>
            <Scrollbar>
              <Card sx={cardStyle}>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={dataFiltered.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        dataFiltered.map((row) => row.id)
                      )
                    }
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
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => alert(row.id)}
                          onEditRow={() => alert('edit')}
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
              </Card>
            </Scrollbar>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <p>error </p>
          </Grid>
        )}
      </Grid>
    </DashboardContent>
  );

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <BlankView title={capitalizeFirtsLetter(t('users.title'))}>{renderUserList}</BlankView>
    </>
  );

  type ApplyFilterProps = {
    inputData: any[];
    filters: any;
    comparator: (a: any, b: any) => number;
  };

  function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
    const { name, status, role } = filters;

    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (name) {
      inputData = inputData.filter(
        (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
      );
    }

    if (status !== 'all') {
      inputData = inputData.filter((user) => user.status === status);
    }

    if (role.length) {
      inputData = inputData.filter((user) => role.includes(user.role));
    }

    return inputData;
  }
}
