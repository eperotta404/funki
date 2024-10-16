import { useState } from 'react';

import { Box, Modal, IconButton } from '@mui/material';

import { useFetchData } from 'src/hooks/use-fetch-data';

import { userService } from 'src/core/infrastructure/instances';
import { GetUser } from 'src/core/domain/useCases/users/GetUser';

import { Iconify } from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';

import { UserNewEditForm } from './user-new-edit-form';

interface UserEditModalProps {
  open: boolean;
  userId: string;
  handleClose: () => void;
  refetch: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
  width: '90%',
  maxWidth: '900px',
  height: 'auto',
  borderRadius: '8px',
};

const getUserUseCase = new GetUser(userService);

export default function UserEditModal(props: UserEditModalProps) {
  const { userId, open, handleClose, refetch } = props;

  const { data: currentUser, loading } = useFetchData(getUserUseCase, userId);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const handleSaveSuccess = () => {
    setShouldRefetch(true);
  };

  const handleModalClose = () => {
    if (shouldRefetch) {
      refetch();
    }
    setShouldRefetch(false);
    handleClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-user-edit"
      aria-describedby="modal-user-edit"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="modal-user-edit" style={{ marginLeft: 10 }}>
            Editar Usuario
          </h2>
          <IconButton onClick={handleModalClose} aria-label="cerrar">
            <Iconify icon="icon-park-solid:close-one" width={30} sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '32vh',
            }}
          >
            <LoadingScreen />
          </Box>
        ) : (
          <>{currentUser && <UserNewEditForm currentUser={currentUser} onSaveSuccess={handleSaveSuccess} />}</>
        )}
      </Box>
    </Modal>
  );
}
