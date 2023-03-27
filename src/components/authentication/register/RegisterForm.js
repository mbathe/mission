import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Alert from '@mui/material/Alert';

// ----------------------------------------------------------------------



const qualifications = [
  'ISA12',
  'Help Desk',
  'Ingénieur Système',
  'Ingénieur Carbone',
];


const services = [
  'TI',
  'RH',
  'Comptabilité',
  'Laminage',
  'Electrodes',
]


export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [onsubmit,setOnsubmit]= useState(false);
  const [anerroraccu, setOnerroraccu]=useState(false);
  const [qualification, setQualification] = React.useState('');
  const [service, setService] = React.useState('');

  const handleChange = (event) => {
    setQualification(event.target.value);
  };


  const handleChange1 = (event) => {
    setService(event.target.value);
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Trop Court!')
      .max(50, 'Trop long!')
      .required('Le nom est requis'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Le prénom est requis'),
    email: Yup.string().email('Email must be a valid email address').required('email requis'),
    password: Yup.string().required('Le mot de passe est requis'),
  
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },



    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(values.email)
      const qual = qualification;
      const serv = service;
      axios.post('http://10.191.171.122:3000/api/auth/signup', {
        prenom:values.firstName,
        nom:values.lastName,
        email:values.email,
        password:values.password,
        qualification:qual,
        service:serv,
  
      })
        .then((res)=>{ console.log(res); navigate('/login', { replace: true }); })
      .catch((error)=>{console.log(error); setOnsubmit(false); setOnerroraccu(true)});

      console.log('entré dans le submit');
      console.log(qual);
      
    }
  });

  const { errors, touched,values, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        {anerroraccu && <Alert severity="error" onClose={() => {setOnerroraccu(false)}}>Cet adresse email est déjà utilisée.!</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Prenom"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Adresse email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={qualification}
          label="Qualification"
          fullWidth
          autoWidth
          onChange={handleChange}
        >
            {qualifications.map((qualification) => (
            <MenuItem
              key={qualification}
              value={qualification}
            >
              {qualification}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Service</InputLabel>
        <Select
          value={service}
          label="Service"
          fullWidth
          autoWidth
          onChange={handleChange1}
        >
            {services.map((service) => (
            <MenuItem
              key={service}
              value={service}
            >
              {service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Stack>
          
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
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
            S'inscrire
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
