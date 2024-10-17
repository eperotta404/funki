import type { CreateUserDto } from 'src/shared/types';
import type { User } from 'src/core/domain/models/user';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
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
      .min(1, { message: '¡El correo electrónico es obligatorio!' })
      .email({ message: '¡El correo electrónico debe ser una dirección válida!' }),
    role: zod.array(zod.string()).min(1, { message: '¡Se requiere al menos un rol!' }),
    password: zod
      .string()
      .min(8, { message: '¡La contraseña debe tener al menos 8 caracteres!' })
      .regex(/[a-z]/, { message: '¡La contraseña debe contener al menos una letra minúscula!' })
      .regex(/[A-Z]/, { message: '¡La contraseña debe contener al menos una letra mayúscula!' })
      .regex(/\d/, { message: '¡La contraseña debe contener al menos un número!' })
      .regex(/[^a-zA-Z0-9]/, {
        message: '¡La contraseña debe contener al menos un carácter especial!',
      }),
    confirmPassword: zod.string().min(1, { message: '¡Por favor, confirma tu contraseña!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '¡Las contraseñas no coinciden!',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

type Props = {
  currentUser?: User;
};

export function UserNewEditForm({ currentUser }: Props) {
  const { selectedOrganization } = useOrganization();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const { data, loading, error, execute } = useMutationData<User, CreateUserDto>(createUserUseCase);

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
    formState: { errors },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (formData) => {
    await execute({
      email: formData.email,
      roles: formData.role,
      password: formData.password,
      sportOrganizationsIds: selectedOrganization?.id ? [selectedOrganization.id] : [],
    });
  });

  useEffect(() => {
    if (data) {
      setAlert({ type: 'success', message: `Nuevo usuario creado: ${data.email}` });
      methods.reset();
    } else if (error) {
      setAlert({ type: 'error', message: 'No se pudo crear usuario.' });
    }
  }, [data, error, methods]);

  const handleChange = () => {
    if (alert) {
      setAlert(null);
    }
  };

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
            {alert && (
              <Alert severity={alert.type} sx={{ mb: 3 }}>
                {alert.message}
              </Alert>
            )}
            <Box rowGap={3} display="grid">
              <Field.Text
                name="email"
                label="Correo electrónico"
                onChange={(e) => {
                  handleChange();
                  methods.setValue('email', e.target.value);
                }}
              />

              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Roles</InputLabel>
                <Select
                  label="Roles"
                  name="role"
                  multiple
                  value={values.role || []}
                  onChange={(e) => {
                    methods.setValue('role', e.target.value as string[]);
                    handleChange();
                  }}
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
                label="Contraseña"
                type={password.value ? 'text' : 'password'}
                onChange={(e) => {
                  handleChange();
                  methods.setValue('password', e.target.value);
                }}
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
                label="Confirmar contraseña"
                type={confirmPassword.value ? 'text' : 'password'}
                onChange={(e) => {
                  handleChange();
                  methods.setValue('confirmPassword', e.target.value);
                }}
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
              <LoadingButton type="submit" variant="contained" loading={loading}>
                {!currentUser ? 'Crear usuario' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
