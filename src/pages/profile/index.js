import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Tooltip,
  Grid,
  Box,
  Stack,
  IconButton,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useRecoilState } from 'recoil';
import { Icon } from '@iconify/react';
import saveFill from '@iconify/icons-eva/save-fill';
import expandMoreFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import axios from 'axios';
import cogoToast from 'cogo-toast';

import { userConnectState } from '../../state/atom';

export default function Profile() {
  const [userConnect, setUserConnect] = useRecoilState(userConnectState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleShowConfPassword = () => {
    setShowConfPassword((show) => !show);
  };

  const LoginSchema = Yup.object().shape({
    current_password: Yup.string().required('Mot de passe requis'),
    new_password: Yup.string()
      .required('Mot de passe requis')
      .notOneOf(
        [Yup.ref('current_password')],
        "Le nouveau mot de passe ne peut pas être le même que l'ancien"
      )
      .min(8, 'Votre mot de passe est trop court.'),
    confirm_new_password: Yup.string()
      .required('Mot de passe requis')
      .oneOf([Yup.ref('new_password')], 'Vos mots de passe ne correspondent pas.')
  });
  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log(userConnect)
      axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/password/${userConnect.userId}`, {
        old_password: values.current_password,
        new_password: values.new_password
      }).then(() => {
        resetForm();
        cogoToast.success('Password updated');
      }).catch((error) => {
        cogoToast.error(error.response.data.message);
      })
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, resetForm } = formik;

  return (
    <Box
      sx={{
        boxShadow: ' rgba(192,192,192,0.4) -2px 2px 15px',
        padding: '50px',
        width: '75%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
      }}
    >
      <Stack container direction="column" spacing={2}>
        <Grid container>
          <Grid item xs={4} md={4} alignItems="center" sx={{ display: 'flex' }}>
            <Typography variant="h6">Nom et Prenom</Typography>
          </Grid>
          <Grid item xs={8} md={8} alignItems="center">
            <TextField value={userConnect.lastName} inputProps={{ readOnly: true }} fullWidth />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} alignItems="center" sx={{ display: 'flex' }}>
            <Typography variant="h6">Email</Typography>
          </Grid>
          <Grid item xs={8} md={8} alignItems="center">
            <TextField value={userConnect.email} inputProps={{ readOnly: true }} fullWidth />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} alignItems="center" sx={{ display: 'flex' }}>
            <Typography variant="h6">Service</Typography>
          </Grid>
          <Grid item xs={8} md={8} alignItems="center">
            <TextField value={userConnect.service} inputProps={{ readOnly: true }} fullWidth />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} alignItems="center" sx={{ display: 'flex' }}>
            <Typography variant="h6">Qualification</Typography>
          </Grid>
          <Grid item xs={8} md={8} alignItems="center">
            <TextField
              value={userConnect.qualification}
              inputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
        </Grid>
        {userConnect.is_ldap_user === 'N' && (
          <Accordion>
            <AccordionSummary
              expandIcon={
                <Icon icon={expandMoreFill} width={50} height={50} sx={{ color: 'black' }} />
              }
            >
              <Typography variant="h6">Modifier le mot de passe</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Grid container>
                      <Grid item xs={4} md={4} alignItems="center" sx={{ display: 'flex' }}>
                        <Typography variant="h6">Password</Typography>
                      </Grid>
                      <Grid item xs={8} md={8} alignItems="center">
                        <TextField
                          fullWidth
                          autoComplete="current_password"
                          {...getFieldProps('current_password')}
                          error={Boolean(touched.current_password && errors.current_password)}
                          helperText={touched.current_password && errors.current_password}
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={4} md={4} alignItems="center" sx={{ display: 'flex' }}>
                        <Typography variant="h6">New Password</Typography>
                      </Grid>
                      <Grid item xs={8} md={8} alignItems="center">
                        <TextField
                          fullWidth
                          {...getFieldProps('new_password')}
                          error={Boolean(touched.new_password && errors.new_password)}
                          helperText={touched.new_password && errors.new_password}
                          type={showNewPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleShowNewPassword} edge="end">
                                  <Icon icon={showNewPassword ? eyeFill : eyeOffFill} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={4} md={4} alignItems="center" sx={{ display: 'flex' }}>
                        <Typography variant="h6">Confirm New Password</Typography>
                      </Grid>
                      <Grid item xs={8} md={8} alignItems="center">
                        <TextField
                          fullWidth
                          {...getFieldProps('confirm_new_password')}
                          error={Boolean(
                            touched.confirm_new_password && errors.confirm_new_password
                          )}
                          helperText={touched.confirm_new_password && errors.confirm_new_password}
                          type={showConfPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleShowConfPassword} edge="end">
                                  <Icon icon={showConfPassword ? eyeFill : eyeOffFill} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Tooltip title="save">
                      <Button
                        type="submit"
                        color="secondary"
                        sx={{
                          borderRadius: '10px',
                          bgcolor: 'info.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.main'
                          }
                        }}
                      >
                        <Icon icon={saveFill} width={50} height={50} />
                      </Button>
                    </Tooltip>
                  </Stack>
                </Form>
              </FormikProvider>
            </AccordionDetails>
          </Accordion>
        )}
      </Stack>
    </Box>
  );
}
