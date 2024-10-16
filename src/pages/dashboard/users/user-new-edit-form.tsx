import type { User } from 'src/core/domain/models/user';

import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { Select, Checkbox, MenuItem, InputLabel, FormControl, ListItemText, FormHelperText } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  role: zod.array(zod.string()).min(1, { message: 'At least one role is required!' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: User;
};

export function UserNewEditForm({ currentUser }: Props) {
  const rolesOptions = ['SUPER_ADMIN', 'SO_ADMIN', 'SO_ASSISTANT'];

  const defaultValues = useMemo(() => {
    const initialRole = Array.isArray(currentUser?.roles) && currentUser.roles.length > 0
      ? currentUser.roles.filter(Boolean) 
      : [rolesOptions[0]]; // Asignar el primer rol por defecto

    return {
      email: currentUser?.email || '',
      role: initialRole,
    };
  }, [currentUser]);

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const menuProps = {
    PaperProps: {
      sx: {
        background: 'white', 
      },
    },
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container justifyContent="center">
        <Grid xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box rowGap={3} display="grid">
              <Field.Text name="email" label="Email address" />
              
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  name="role"
                  multiple
                  value={values.role || []}
                  onChange={(e) => methods.setValue('role', e.target.value as string[])}
                  renderValue={(selected) =>
                    Array.isArray(selected) && selected.length > 0 ? selected.join(', ') : ''
                  }
                  MenuProps={menuProps}
                >
                  {rolesOptions.map((role) => (
                    <MenuItem key={role} value={role}>
                      <Checkbox checked={values.role.includes(role)} />
                      <ListItemText primary={role} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && (
                  <FormHelperText>{errors.role.message}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create user' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
