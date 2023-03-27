import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line import/no-unresolved


// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Alert from '@mui/material/Alert';




// ----------------------------------------------------------------------

export default function AddClientForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [onsubmit,setOnsubmit]= useState(false);
  const [anerroraccu, setOnerroraccu]=useState(false);
  const typeType = ["MASCULIN","FEMININ"]
  const [valuee, setValuee] = useState(new Date);


  
  const RegisterSchema = Yup.object().shape({
    nom: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name name required'),
    prenom: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('fist name is required'),
    adresse: Yup.string().required('Adresse is required'),
    lieuNaissance:Yup.string().required('place of birth is required'),
    numGroupe:Yup.string().required('group number is required'),
    telephoneParent:Yup.string().required('parent phone is required'),
    besionSpecifique:Yup.string().required('Specific need is required'),
    school : Yup.string().required('School is required'),
  });

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      adresse:'',
      lieuNaissance:'',
      numGroupe:'',
      telephoneParent:'',
      besionSpecifique:'',
      school:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log("on entre ici")
     // console.log(values)
     // console.log(type)
      const data = {
        sexe:  typeType[type],
        nom: values.nom,
        adresse: values.adresse,
        prenom: values.prenom,
        lieuNaissance: values.lieuNaissance,
        numGroupe:values.numGroupe,
        telephoneParent:values.telephoneParent,
        besionSpeficique: values.besionSpecifique,
        school:values.school,
        dateNaissance:valuee,
      }
      console.log(data)
      axios.post('http://localhost:3000/api/student', data)
      .then((res)=>{ console.log(res); navigate('/dashboard/app'); })
      .catch((error)=>{console.log(error); setOnsubmit(false); setOnerroraccu(true)});
      
    }
  });
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const { errors, touched,values, handleSubmit, isSubmitting, getFieldProps } = formik;


    

  return (
    <div style={{width:500, margin: "40px auto"}}>
    
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps('nom')}
              error={Boolean(touched.nom && errors.nom)}
              helperText={touched.nom && errors.nom}
            />

            <TextField
              fullWidth
              label="Prénom"
              {...getFieldProps('prenom')}
              error={Boolean(touched.prenom && errors.prenom)}
              helperText={touched.prenom && errors.prenom}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="adresse"
            
            label="Adresse"
            {...getFieldProps('adresse')}
            error={Boolean(touched.adresse && errors.adresse)}
            helperText={touched.adresse && errors.adresse}
          />
          <TextField
            fullWidth
            autoComplete="Besion spécifique"
            label="besionSpecifique"
            {...getFieldProps('besionSpecifique')}
            error={Boolean(touched.besionSpecifique && errors.besionSpecifique)}
            helperText={touched.besionSpecifique && errors.besionSpecifique}
          />
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FormControl required sx={{  minWidth: 220 }}>
        <InputLabel id="demo-simple-select-required-label">Sexe</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={type}
          error={type===""}
          label="Sexe *"
          onChange={handleChange}
        >
          <MenuItem value={0}>MASCULIN</MenuItem>
          <MenuItem value={1}>FEMININ</MenuItem>
        </Select>
       
      </FormControl>
            <TextField
              fullWidth
              label="Numéro du groupe"
              {...getFieldProps('numGroupe')}
              error={Boolean(touched.numGroupe && errors.numGroupe)}
              helperText={touched.numGroupe && errors.numGroupe}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date de naissance"
        value={valuee}
        onChange={(newValue) => {
          setValuee(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

            <TextField
              fullWidth
              label="Lieu de naissance"
              {...getFieldProps('lieuNaissance')}
              error={Boolean(touched.lieuNaissance && errors.lieuNaissance)}
              helperText={touched.lieuNaissance && errors.lieuNaissance}
            />
          </Stack>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Ecole"
              {...getFieldProps('school')}
              error={Boolean(touched.school && errors.school)}
              helperText={touched.school && errors.school}
            />
            <TextField
              fullWidth
              label="Téléphone parent"
              {...getFieldProps('telephoneParent')}
              error={Boolean(touched.telephoneParent && errors.telephoneParent)}
              helperText={touched.telephoneParent && errors.telephoneParent}
            />
          </Stack>
         
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={onsubmit}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
    </div>
  );
}
