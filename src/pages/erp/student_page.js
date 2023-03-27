import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import KeyIcon from '@mui/icons-material/Key';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {tokenState} from '../../state/atom';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

  const columns = [
    {
      field: 'firstName',
      headerName: 'Nom',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Type',
      width: 150,
      editable: true,
    },
    
    {
      field: 'fullName',
      headerName: 'Donateur',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    
  ];

  const columnsAssistance = [
    {
      field: 'nom',
      headerName: 'Nom',
      width: 150,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      editable: true,
    },
    
    {
      field: 'donateur',
      headerName: 'Donateur',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      editable: true,
    },
    
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
  function FormRow({label,value}) {
    return (
      <>
    
            <Box sx={{ display: 'flex' ,marginLeft:2, }}>
                <Typography variant="subtitle2" gutterBottom style={{marginRight:2,}}>
                    {label}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div" style={{color:"blue"}}>
                    {value}
                </Typography>
            </Box>
        
      </>
    );
  }



export default function StudendPage(props) {
  
  const [data, setData] = React.useState({});
  const [name, setName] = React.useState('Composed TextField');
  const [info, setInfo] = React.useState({});
  const [token, setToken] = useRecoilState(tokenState);
  const [isdisabled, setIsDisabled] = React.useState(true);
  const [isFist, setIsFirst] = React.useState(true);
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const  [assistantRow, setAssistantRow]= React.useState({})
  const  [parcoursRow, setParcoursRow] = React.useState({})
  const [valuee, setValuee] = React.useState(new Date);
  const config = {
    headers: { Authorization: `${token}` }
  };
  axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
  const { state } = useLocation()
  React.useEffect(() => { 
   if(isFist){
    axios.get(`http://localhost:3000/api/student/${state}`)
    .then((res)=>{    
     setData(res.data)
     
     const parcours = res.data.parcours.map((parcours,index) => ({...parcours,id:index}))
     const assistances = res.data.res.data.assistance.map((assistance,index) => ({...assistance,id:index}))
    
     setParcoursRow(parcours)
     setAssistantRow(assistances)
    
   })
  .catch((error)=>{console.log(error);});
  setIsFirst(false)
   }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
   // validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("on entre ici")
      /*
      setOnsubmit(true);
      console.log(values.email)
      axios.post('http://localhost:3000/api/auth/login', {
        email:values.email,
        password:values.password
      })
      .then((res)=>{ setToken(res.data.token); console.log(res); navigate('/dashboard', { replace: true }); })
      .catch((error)=>{console.log(error); setOnsubmit(false); setOnerroraccu(true)});
      */
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

 
  return (
    <div>
    <div style={{   display:"flex", alignItems:"center", justifyContent:"center" }} >
       <Box sx={{  margin:3, width:"40%" , alignItems:"center", justifyContent:"center"}}> 
       
       <Grid container spacing={3}  >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nom"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            disabled ={isdisabled}
            value = {data.nom}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Prénom"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            disabled ={isdisabled}
            value = {data.prenom}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Sexe"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            disabled ={isdisabled}
            value = {data.sexe}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <div style={{ height:10 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date de naissance"
        value={valuee}
        onChange={(newValue) => {
          setValuee(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        disabled ={isdisabled}
      />
    </LocalizationProvider>
        </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="address2"
            name="address2"
            label="Adresse"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            disabled ={isdisabled}
            value = {data.adresse}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="address2"
            name="address2"
            label="Lieu de naissance"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            disabled ={isdisabled}
            value = {data.lieuNaissance}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Télephone Parent"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            disabled ={isdisabled}
            value = {data.telephoneParent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Beson spécique"
            fullWidth
            variant="standard"
            disabled ={isdisabled}
            value = {data.besionSpeficique}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Ecole"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            disabled ={isdisabled}
            value = {data.school}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Groupe"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            disabled ={isdisabled}
            value = {data.numGroupe}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    
      </Box>
      <Box sx={{  margin:3, alignItems:"center", justifyContent:"center", width: "40%" }}>
      <div style={{ height: 400,   }}>
                <DataGrid 
                  rows={parcoursRow}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
             
              <div style={{width: "100%" , spacing:20, display:"flex" }}>
              <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <TextField
                required
                id="firstName"
                name="Nom"
                label="Ecole"
                autoComplete="given-name"
                variant="standard"
                style={{ width: "25%", }}
              />
              <TextField
                required
                id="firstName"
                name="Type"
                label="Classe"
                autoComplete="given-name"
                variant="standard"
                style={{ width: "25%", marginLeft:20 }}
              />
              <TextField
                required
                id="firstName"
                name="Donateur"
                label="Moyenne"
                autoComplete="given-name"
                variant="standard"
                style={{ width: "25%", marginLeft:20}}
              />
               <div><Button type="submit" style={{ width: "25%", height:40, marginLeft:10, marginTop:10  }} variant="contained">Add</Button></div>
               </Form>
    </FormikProvider>
              </div>
      </Box>
    </div>
    <div style={{alignItems:"center", justifyContent:"center", display:"flex"}} >
    <Box sx={{  marginTop:8, marginLeft:5, marginRight:5, marginBottom:10,  width: "70%" }}>
      <Grid container spacing={5}>
            <Grid container >
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid 
                  rows={assistantRow}
                  columns={columnsAssistance}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
              </div>
              <div style={{width: "100%" , spacing:20, display:"flex" }}>
              <TextField
                required
                id="firstName"
                name="Nom"
                label="Non"
                autoComplete="given-name"
                variant="standard"
                style={{ width: "25%", }}
              />
              <TextField
                required
                id="firstName"
                name="Type"
                label="Type"
                autoComplete="given-name"
                variant="standard"
                style={{ width: "25%", marginLeft:20 }}
              />
              <TextField
                required
                id="firstName"
                name="Donateur"
                label="Donateur"
                autoComplete="given-name"
                variant="standard"
                style={{ width: "25%", marginLeft:20}}
              />
               <div><Button style={{ width: "25%", height:40, marginLeft:10, marginTop:10  }} variant="contained">Add</Button></div>
              </div>

              
          </Grid>
          
     </Grid>
     </Box>
     </div>
    </div>
  );
}
