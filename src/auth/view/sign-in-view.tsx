import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { Box, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../hooks';
import { signInWithPassword } from '../context';

// ----------------------------------------------------------------------

export function createSignInSchema(t: any) {
  return zod.object({
    email: zod
      .string()
      .min(1, { message: capitalizeFirtsLetter(t('auth.emailRequired')) })
      .email({ message: capitalizeFirtsLetter(t('auth.emailInvalid')) }),
    password: zod
      .string()
      .min(1, { message: capitalizeFirtsLetter(t('auth.passwordRequired')) })
      .min(5, { message: capitalizeFirtsLetter(t('auth.passwordMinLength')) }),
  });
}

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const SignInSchema = createSignInSchema(t);
  type SignInSchemaType = zod.infer<typeof SignInSchema>;

  const defaultValues = {
    email : 'admin@fanki.co',
    password: '12345',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : t(error.message));
    }
  });

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        name="email"
        label={capitalizeFirtsLetter(t('auth.inputEmail'))}
        InputLabelProps={{ shrink: true }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.vars.palette.secondary.lighter,
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: theme.vars.palette.secondary.light,
            },
          },
        }}
      />

      <Box gap={1.5} display="flex" flexDirection="column">

        <Field.Text
          name="password"
          label={capitalizeFirtsLetter(t('auth.inputPassword'))}
          placeholder={capitalizeFirtsLetter(t('auth.inputPassword'))}
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.vars.palette.secondary.lighter,
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: theme.vars.palette.secondary.light,
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={capitalizeFirtsLetter(t('auth.buttons.login'))}
      >
        {capitalizeFirtsLetter(t('auth.buttons.login'))}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {capitalizeFirtsLetter(errorMsg)}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
