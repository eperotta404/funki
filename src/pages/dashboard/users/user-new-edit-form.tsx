import type { CreateUserDto } from 'src/shared/types';
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
import {
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  IconButton,
  FormControl,
  ListItemText,
  FormHelperText,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useMutationData } from 'src/hooks/use-mutation-data';

import { userService } from 'src/core/infrastructure/instances';
import { CreateUser } from 'src/core/domain/useCases/users/CreateUser';
import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

const createUserUseCase = new CreateUser(userService);

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod
  .object({
    email: zod
      .string()
      .min(1, { message: 'Email is required!' })
      .email({ message: 'Email must be a valid email address!' }),
    role: zod.array(zod.string()).min(1, { message: 'At least one role is required!' }),
    password: zod
      .string()
      .min(8, { message: 'Password must be at least 8 characters long!' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter!' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter!' })
      .regex(/\d/, { message: 'Password must contain at least one number!' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character!' }),
    confirmPassword: zod.string().min(1, { message: 'Please confirm your password!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

type Props = {
  currentUser?: User;
};

export function UserNewEditForm({ currentUser }: Props) {
  const { selectedOrganization } = useOrganization();
  const { data, loading, error, execute } = useMutationData<User, CreateUserDto>(
    createUserUseCase
  );

  const rolesOptions = ['SUPER_ADMIN', 'SO_ADMIN', 'SO_ASSISTANT'];

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const defaultValues = useMemo(() => {
    const initialRole =
      Array.isArray(currentUser?.roles) && currentUser.roles.length > 0
        ? currentUser.roles.filter(Boolean)
        : [rolesOptions[0]];

    return {
      email: currentUser?.email || '',
      role: initialRole,
      password: '',
      confirmPassword: '',
    };
  }, [currentUser]);

  const methods = useForm<NewUserSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (formData) => {
    await execute({
      email: formData.email,
      roles: formData.role,
      password: formData.password,
      sportOrganizationsIds: selectedOrganization?.id
        ? [selectedOrganization.id]
        : [],
    });
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
              <Field.Text name="email" label="Email address" autoComplete="off" />

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
                {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
              </FormControl>
              <Field.Text
                name="password"
                label="Password"
                type={password.value ? 'text' : 'password'}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={password.onToggle} edge="end">
                        <Iconify
                          icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Field.Text
                name="confirmPassword"
                label="Confirm Password"
                type={confirmPassword.value ? 'text' : 'password'}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={confirmPassword.onToggle} edge="end">
                        <Iconify
                          icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
