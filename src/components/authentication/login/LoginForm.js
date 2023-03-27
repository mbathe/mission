import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import axios from 'axios';
import secureLocalStorage from "react-secure-storage";

import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';

import { tokenState, userConnectState, authenticationState } from '../../../state/atom';

// ----------------------------------------------------------------------

export default function LoginForm({ next }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [onsubmit, setOnsubmit] = useState(false);
  const [anerroraccu, setOnerroraccu] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  const [userConnect, setUserConnect] = useRecoilState(userConnectState);
  const [authenticated, setAuthenticated] = useRecoilState(authenticationState);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Nom d'utilisateur requis"),
    password: Yup.string().required('Mot de passe requis')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      setOnsubmit(true);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
          email: values.email,
          password: values.password
        })
        .then((res) => {
          setToken(res.data.token);
          setUserConnect(res.data);
          setAuthenticated(true);
          secureLocalStorage.setItem('mo_user_data', res.data);
          secureLocalStorage.setItem('mo_is_authenticated', true);

          navigate(next || '/dashboard/mo', { replace: true });
        })
        .catch((error) => {
          console.log(error);
          setOnsubmit(false);
          setOnerroraccu(true);
        });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {anerroraccu && (
            <Alert
              severity="error"
              onClose={() => {
                setOnerroraccu(false);
              }}
            >
              Nom d'utilisateur ou mot de passe incorrect!
            </Alert>
          )}

          <TextField
            fullWidth
            autoComplete="Nom d'utilisateur"
            label="Nom d'utilisateur"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mot de Passe"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={onsubmit}
          >
            Connexion
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
