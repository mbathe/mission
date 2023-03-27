/* eslint-disable jsx-a11y/label-has-associated-control */
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
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Alert from '@mui/material/Alert';

// ----------------------------------------------------------------------

const Input = styled('input')({
    display: 'none',
  });

export default function AddProductForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [urlimage, setUrlimage] =useState([])
  const [onsubmit,setOnsubmit]= useState(false);
  const [anerroraccu, setOnerroraccu]=useState(false);
  const typeType = ["Particulier","Professionnel","Particulier"]
  
  
  const [file,setFile] = useState(null)

  const RegisterSchema = Yup.object().shape({
    description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Description is required'),
    price: Yup.number().required('the value must be a number'),
    tva: Yup.number().required('TVA must be a number'),
    coeff_marge: Yup.number().required('Coeff marge must be a number'),
    purchasing_cost: Yup.number().required('purchasing cost must be a number'),
    note:Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      description: '',
      price: '',
      tva: '',
      coeff_marge: '',
      purchasing_cost:'',
      note:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log("on entre ici")
     // console.log(values)
     // console.log(type)
      const data = {
        description: values.description,
        price: Number(values.price),
        tva: Number(values.tva),
        coff_marge: Number(values.coeff_marge),
        purchasing_cost: Number(values.purchasing_cost),
        note: values.note,
      }
      const formData = new FormData();
     
      formData.append('bonjour',150)
      formData.append('image', file);
      formData.append('product',JSON.stringify(data))
     console.log(data)
     // console.log(file)
     console.log(formData.get('image'))
      
      
      axios.post('http://localhost:3000/api/product', formData,{ "Content-Type": "multipart/form-data" })
      .then((res)=>{ console.log(res); navigate('/erp_ecm'); })
      .catch((error)=>{console.log(error); setOnsubmit(false); setOnerroraccu(true)});
      
    }
  });
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const onChange = (e) =>{
    setFile(e.target.files[0])
    setUrlimage(e.target.value)
    
  }
  const { errors, touched,values, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div style={{width:500, margin: "40px auto"}}>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          
          <TextField
            fullWidth
            autoComplete="description"
            label="Description"
            
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Price"
              InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
              {...getFieldProps('price')}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />

            <TextField
              fullWidth
              label="TVA"
              {...getFieldProps('tva')}
              error={Boolean(touched.tva && errors.tva)}
              helperText={touched.tva && errors.tva}
            />
            <TextField
              fullWidth
              label="Coeff.marge"
              {...getFieldProps('coeff_marge')}
              error={Boolean(touched.coeff_marge && errors.coeff_marge)}
              helperText={touched.coeff_marge && errors.coeff_marge}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Purchasing Cost"
              InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
              {...getFieldProps('purchasing_cost')}
              error={Boolean(touched.purchasing_cost && errors.purchasing_cost)}
              helperText={touched.purchasing_cost && errors.purchasing_cost}
            />

            <TextField
              fullWidth
              label="Note"
              {...getFieldProps('note')}
              error={Boolean(touched.note && errors.note)}
              helperText={touched.note && errors.note}
            />
          </Stack>
          {
         file==null?
         <div style ={{margin: "10px auto"} }>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={(e)=>{onChange(e)}} />
            <IconButton color="primary" aria-label="upload picture" component="span" >
            <PhotoCamera sx={{ fontSize: 80 }} />
            </IconButton>
        </label></div>:
          <img
            style ={{height:180, width:300, margin: "2px auto"} }
            src={URL.createObjectURL(file)}
            srcSet={`${itemData[0].img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={itemData[0].title}
            loading="lazy"
          />
          }
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={onsubmit}
          >
            Add
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
    </div>
  );
}


const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];