import type { User } from 'src/core/domain/models/user';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Alert, Button, CircularProgress } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useFetchData } from 'src/hooks/use-fetch-data';
import { useMutationData } from 'src/hooks/use-mutation-data';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { userService } from 'src/core/infrastructure/instances';
import { GetUsers } from 'src/core/domain/useCases/users/GetUsers';
import { DeleteUser } from 'src/core/domain/useCases/users/DeleteUser';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

import { BlankView } from 'src/sections/blank/view';

import UsersTable from './users-table';
import UserEditModal from './user-edit-modal';

const getUsersUseCase = new GetUsers(userService);

const deleteUserUseCase = new DeleteUser(userService);

export default function Page() {
  const { t } = useTranslation();
  const { selectedOrganization } = useOrganization();

  const metadata = { title: `Usuarios | Listado - ${CONFIG.appName}` };

  const { data, loading, refetch } = useFetchData(getUsersUseCase, selectedOrganization?.id);

  const [tableData, setTableData] = useState<User[]>(data || []);
  const [open, setOpen] = useState<boolean>(false);
  const [userIdSelected, setUserIdSelected] = useState<string>('');
  const [emailSelected, setEmailSelected] = useState<string>('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const confirm = useBoolean();

  const {
    data: dataDeleted,
    loading: loadingDelete,
    error: errorDelete,
    execute: executeDelete,
  } = useMutationData<User, string>(deleteUserUseCase);

  const handleClose = () => {
    setOpen(false);
  };

  const onEdit = (userId: string) => {
    setUserIdSelected(userId);
    setOpen(true);
  };

  const onDelete = (userId: string, email: string) => {
    setUserIdSelected(userId);
    setEmailSelected(email);
    confirm.onTrue();
  };

  useEffect(() => {
    if (dataDeleted) {
      setAlert({ type: 'success', message: `Usuario eliminado: ${emailSelected}` });
      refetch();
    } else if (errorDelete) {
      setAlert({ type: 'error', message: `No se pudo eliminar el usuario ${emailSelected}` });
    }
  }, [dataDeleted, errorDelete, emailSelected, refetch]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [alert]);

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
        ) : (
          <Grid item xs={12}>
            <>
              {alert && (
                <Alert severity={alert.type} sx={{ mt:2, mb: 0 }}>
                  {alert.message}
                </Alert>
              )}
              <UsersTable tableData={tableData} onEdit={onEdit} onDelete={onDelete} />
              {userIdSelected && (
                <>
                  <UserEditModal
                    userId={userIdSelected}
                    open={open}
                    handleClose={handleClose}
                    refetch={refetch}
                  />
                  <ConfirmDialog
                    open={confirm.value}
                    onClose={confirm.onFalse}
                    title="Eliminar Usuario"
                    content={
                      <>
                        ¿Estas seguro de eliminar el usuario <strong> {emailSelected} </strong> ?
                      </>
                    }
                    action={
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          executeDelete(userIdSelected).then(() => {
                            confirm.onFalse();
                            refetch();
                          });
                        }}
                        disabled={loadingDelete}
                        startIcon={loadingDelete ? <CircularProgress size={20} /> : null}
                      >
                        {loadingDelete ? 'Eliminando...' : 'Eliminar'}
                      </Button>
                    }
                  />
                </>
              )}
            </>
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
}
