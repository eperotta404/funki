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
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  width: '90%',
  maxWidth: '900px',
  height: 'auto',
  borderRadius: '8px',
};

const getUserUseCase = new GetUser(userService);

export default function UserEditModal(props: UserEditModalProps) {
  const { userId, open, handleClose } = props;

  const { data: currentUser, loading } = useFetchData(getUserUseCase, userId);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-user-edit"
      aria-describedby="modal-user-edit"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="modal-user-edit" style={{ marginLeft: 10 }}>
            Editar Usuario
          </h2>
          <IconButton onClick={handleClose} aria-label="cerrar">
            <Iconify icon="icon-park-solid:close-one" width={30} sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Box>
        {loading ? (
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
        ) : (
          <>{currentUser && <UserNewEditForm currentUser={currentUser} />}</>
        )}
      </Box>
    </Modal>
  );
}
