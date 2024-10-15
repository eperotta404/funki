import { useState } from 'react';
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

type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
};

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

  console.log('UNAAAAAAA', data);

  const TABLE_HEAD = [
    { id: 'name', label: 'Name' },
    { id: 'phoneNumber', label: 'Phone number', width: 180 },
    { id: 'company', label: 'Company', width: 220 },
    { id: 'role', label: 'Role', width: 180 },
    { id: 'status', label: 'Status', width: 100 },
    { id: '', width: 88 },
  ];

  const _userList = [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'CEO',
      email: 'nannie.abernathy70@yahoo.com',
      address: '908 Jack Locks',
      name: 'Jayvion Simon',
      isVerified: true,
      company: 'Lueilwitz and Sons',
      country: 'United States',
      avatarUrl: '/assets/images/mock/avatar/avatar-1.webp',
      phoneNumber: '+1 202-555-0143',
      status: 'active',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'CTO',
      email: 'ashlynn.ohara62@gmail.com',
      address: '908 Jack Locks',
      name: 'Lucian Obrien',
      isVerified: true,
      company: 'Gleichner, Mueller and Tromp',
      country: 'Canada',
      avatarUrl: '/assets/images/mock/avatar/avatar-2.webp',
      phoneNumber: '+1 416-555-0198',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Project Coordinator',
      email: 'milo.farrell@hotmail.com',
      address: '908 Jack Locks',
      name: 'Deja Brady',
      isVerified: true,
      company: 'Nikolaus - Leuschke',
      country: 'United Kingdom',
      avatarUrl: '/assets/images/mock/avatar/avatar-3.webp',
      phoneNumber: '+44 20 7946 0958',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Team Leader',
      email: 'violet.ratke86@yahoo.com',
      address: '908 Jack Locks',
      name: 'Harrison Stein',
      isVerified: false,
      company: 'Hegmann, Kreiger and Bayer',
      country: 'Australia',
      avatarUrl: '/assets/images/mock/avatar/avatar-4.webp',
      phoneNumber: '+61 2 9876 5432',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Customer Support Specialist',
      email: 'vergie.block82@hotmail.com',
      address: '908 Jack Locks',
      name: 'Soren Durham',
      isVerified: true,
      company: 'Heidenreich, Stokes and Parker',
      country: 'South Africa',
      avatarUrl: '/assets/images/mock/avatar/avatar-11.webp',
      phoneNumber: '+27 11 123 4567',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Sales Manager',
      email: 'vito.hudson@hotmail.com',
      address: '908 Jack Locks',
      name: 'Cortez Herring',
      isVerified: true,
      company: 'Pagac and Sons',
      country: 'Russia',
      avatarUrl: '/assets/images/mock/avatar/avatar-12.webp',
      phoneNumber: '+7 495 123-4567',
      status: 'pending',
    },
  ];

  const [tableData, setTableData] = useState<IUserItem[]>(_userList);
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

  const cardStyle = {mt: 5, p: 3, backgroundColor: 'background.default', boxShadow: 3 };

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
