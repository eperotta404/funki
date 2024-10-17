import { Box, Modal } from '@mui/material';

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
  p: 2,
  width: '90%',
  maxWidth: '900px',
  height: 'auto',
  borderRadius: '8px',
};
export default function UserEditModal(props: UserEditModalProps) {
  const { userId, open, handleClose } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-user-edit"
      aria-describedby="modal-user-edit"
    >
      <Box sx={style}>
        <UserNewEditForm />
      </Box>
    </Modal>
  );
}
