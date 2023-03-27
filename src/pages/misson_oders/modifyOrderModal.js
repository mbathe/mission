import React, { useState } from 'react';
import {
    Modal,
} from 'antd';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, redirect } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';




import RadioButtonsGroup from './reviseur_radio';
import VehiculeRadioGroup from './vehicule_radio';
import {tokenState,userConnectState} from '../../state/atom';





// ----------------------------------------------------------------------



export default function ModifyOrderModal(props) {


    const navigate = useNavigate();
    const [onsubmit, setOnsubmit] = useState(false);
    const [anerroraccu, setOnerroraccu] = useState(false);
    const [service, setService] = useState('');
    const [typeVehicule, setTypeVehicule] = React.useState(0);
    const [TypeRevision, setTypeRevision] = React.useState(0);
    
    
    const [changeUser, setChangeUser] = React.useState(false)
   
    
    const [loading2, setLoading2] = React.useState(false);
    function handleClick() {
      setLoading2(true);
    }

    const [auteurId, setauteurId] = React.useState('');


    const [users, setUsers] = React.useState([])
    const [services, setServices] = React.useState([])
    const [reviseurs, setReviseurs] = React.useState([])
    const [correspondantSag, setCorrespondntSag] = React.useState([])
    const userConnect = useRecoilValue(userConnectState);

    const [correspondantSagSelect, setCorrespondntSagSelect] = React.useState([])

    const [sackOpen, setsackOpen] = React.useState(false);
    const [sackOpenError, setsackOpenError] = React.useState(false);

    const openSack = () => {
        setsackOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setsackOpen(false);
      };

      const openSackErro = () => {
        setsackOpenError(true);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setsackOpenError(false);
      };
   
   
     
    


    React.useEffect(() => { 
         axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/new_mission`)
         .then((res)=>{   
          setUsers(res.data.users)
          setReviseurs(res.data.reviewers)
          setCorrespondntSag(res.data.correspond_sags)
          setChangeUser(true);
        })
       .catch((error)=>{console.log(error);});
       
        
       }, [changeUser]);


       

    const handleChangeVehicule = (event) => {
        setTypeVehicule(event.target.value);
    };

    const handleChangeRevision = (event ) => {
        setTypeRevision(event.target.value);
    };

   


    

    const defaultProps = {
        options: users,
        getOptionLabel: (option) => option.NOM,
    };
    

    const [dateDepart, setDateDepart] = React.useState(
        new Date
    );

    const [dateRetour, setDateRetour] = React.useState(
        new Date
    );

       

    const handleChange2 = (event) => {
        setService(event.target.value);
    };

    const RegisterSchema = Yup.object().shape({
        objet: Yup.string()
            .min(2, 'Trop Court!')
            .max(700, 'Trop long!')
            .required('L\'objet est requis'),
             ville: Yup.string().min(2, 'Too Short!').max(200, 'Too Long!').required('Le lieu est requis'),
            service : Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Le service est requis'),
            fonction: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Votre fonction est requise'),
            nom : Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Le nom est requis'),
            reviseursForm: Yup.array()
            .of(
              Yup.object().shape({
                NOM:Yup.string()
                  .max(255)
                  .required()
                  .label('NOM')
                  ,
                  USER_ID:Yup.string()
                  .max(255)
                  .required()
                  .label('USER_ID')
                }),
               
            )
            .min(1, 'Au moins un reviseurs est requis')
    });

    const formik = useFormik({
        initialValues: {
            ville: '',
            objet: '',
            details: '',
            service: '',
            fonction : '',
            marque :'', 
            imputation : '',
            nom :'',
            reviseursForm : [],
        },

        validationSchema: RegisterSchema,
        onSubmit: async () => {
           
           // handleClick()
            console.log("valeur")
            const newMissionOrder = {
                    user_creator : userConnect.userId ,
                    auteur_id:auteurId ,
                    lieu : values.ville  ,
                    objet : values.objet,
                    details:values.details,
                    service: values.service,
                    fonction :values.fonction,
                    date_depart :  `${dateDepart.toLocaleDateString("fr-FR")} ${dateDepart.toLocaleTimeString()}`,
                    date_retour: `${dateRetour.toLocaleDateString("fr-FR")} ${dateRetour.toLocaleTimeString()}`,
                    type_vehicule :typeVehicule ,
                    marque :values.marque,
                    rev_type:TypeRevision,
                    alucam_rev_id: "",
                    status:0,
                    reviseur_names:values.reviseursForm.map(r => r.NOM).join(' ;'),
                    corresp_sag_id: correspondantSagSelect.map(r => r.NOM).join(';'),
                    imputation : values.imputation,
                    piece_jointes:"",
                    reviseurs:values.reviseursForm.map(r => r.USER_ID)
                 }
            
             console.log(newMissionOrder);
             
           
           setLoading2(true);
            
             
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/mission_order/modify`, newMissionOrder)
                .then((res) => { 
                    handleOk2();
                    setLoading2(false);
                    console.log(res); 
                    setOnerroraccu(false);
                    openSack();
                    
                   
                 })
                .catch((error) => {setLoading2(false); console.log(error);   setOnerroraccu(true) });
               
        }
    });

    const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps,  setFieldValue } = formik;


    const showModalModify = () => {
        props.showModalModify();
    };

    const handleOk2 = () => {
        props.handleOk2();
    };

    const handleCancel2 = () => {
        props.handleCancel();
    };

    return <Modal
        centered={true}
        width={920}
        // height='100%'
        open={props.open2}
        title="Vous êtes sur le point de Modifier un odre de mission"
        onOk={handleOk2}
        closable={false}
        onCancel={handleCancel2}
        footer={[

        ]}
    >
        <>
        <Snackbar
        open={sackOpen}
        autoHideDuration={7000}
        onClose={handleClose}
        message="Note archived"
        anchorOrigin={{  vertical: 'top', horizontal: 'right',}}
      > 
      <Alert severity="success">Ordre de mission crée avec succès!</Alert>
      </Snackbar>
        <FormikProvider value={formik} >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={2} style={{ marginTop: 10 }}>
                    {anerroraccu && <Alert severity="error" onClose={() => { setOnerroraccu(false) }}>Une erreur est survenue, vérifier que les informations entrées sont corrects et ressayer!</Alert>}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Autocomplete
                            {...defaultProps}
                            disableCloseOnSelect
                            options={users}
                            onChange={(e, value) => {
                                setFieldValue("nom", value?.NOM || "")
                                setauteurId(value?.USER_ID || "")
                                console.log(value);
                            }}
                            getOptionLabel={(option) => option.NOM}

                            renderInput={(params) => (
                                <TextField {...params} {...getFieldProps('nom')} label="Nom & Prénoms" variant="standard"  error={Boolean(touched.nom && errors.nom)}
                                helperText={touched.nom && errors.nom} />
                            )}
                            fullWidth
                                                 />
                          <TextField
                        style={{ width: 560 }}
                        variant="standard"
                        label="Service"
                        {...getFieldProps('service')}
                        error={Boolean(touched.service && errors.service)}
                        helperText={touched.service && errors.service}
                    />
                         <TextField
                        style={{ width: 560 }}
                        variant="standard"
                        label="Fonction"
                        {...getFieldProps('fonction')}
                        error={Boolean(touched.fonction && errors.fonction)}
                        helperText={touched.fonction && errors.fonction}
                    />
                    </Stack>


                    <TextField
                        fullWidth
                        label="Objet de la mission"
                        {...getFieldProps('objet')}
                        error={Boolean(touched.objet && errors.objet)}
                        helperText={touched.objet && errors.objet}
                    />

                    <TextField
                        fullWidth
                        label="Détails"
                        multiline
                        rows={2}
                        maxRows={4}
                        {...getFieldProps('details')}
                        error={Boolean(touched.details && errors.details)}
                        helperText={touched.details && errors.details}
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                             fullWidth
                            label="Lieu"
                            {...getFieldProps('ville')}
                            error={Boolean(touched.ville && errors.ville)}
                            helperText={touched.ville && errors.ville}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DateTimePicker
                                inputFormat="dd/MM/yyyy hh:mm:ss"
                                label="Date de début"
                                value={dayjs(dateDepart)}
                                onChange={(e) => {
                                    setDateDepart(e)
                                   // setFieldVa``lue("nom", value?.NOM || "")
                                    console.log(`${e.toLocaleDateString("fr-FR")} ${e.toLocaleTimeString()}`);
                                }}
                               // onChange={handleChangeDate}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                            <DateTimePicker
                                inputFormat="dd/MM/yyyy hh:mm:ss"
                                label="Date de fin"
                                value={dayjs(dateRetour)}
                                onChange={(e) => {
                                    setDateRetour(e)
                                   // setFieldValue("nom", value?.NOM || "")
                                    console.log(e);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Stack>


                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <FormControl sx={{ minWidth: 220 }} fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">Type de véhicule</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={typeVehicule}
                                label="Type de véhicule"
                                onChange={handleChangeVehicule}
                            >
                                <MenuItem value={0}>
                                    <em>Véhicule usine</em>
                                </MenuItem>
                                <MenuItem value={1}>Véhicule personnel</MenuItem>
                                 <MenuItem value={2}>Transport en commun</MenuItem>
                                <MenuItem value={3}>Autre</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Marque"
                            {...getFieldProps('marque')}
                            
                        />
                         <FormControl sx={{ minWidth: 250 }} fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">Type de révision</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={TypeRevision}
                                label="Type de véhicule"
                                onChange={handleChangeRevision}
                            >
                                <MenuItem value={0}>
                                    <em>Série</em>
                                </MenuItem>
                                <MenuItem value={1}>Parallèle</MenuItem>
                                <MenuItem value={2}>Cascade</MenuItem>
                            </Select>
                        </FormControl>
                        
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Autocomplete
                            multiple
                            limitTags={3}
                            id="multiple-limit-tags"
                            onChange={(e, value) => {
                                setFieldValue("reviseursForm", value || [])
                                console.log(value);
                            }}
                            options={reviseurs}
                            getOptionLabel={(option) => option.NOM}
                            defaultValue={[]}
                            renderInput={(params) => (
                                <TextField {...params} label="Riviseurs" {...getFieldProps('reviseursFom')} placeholder="Favorites" error={Boolean(touched.reviseursForm && errors.reviseursForm)}
                                helperText={touched.reviseursForm && errors.reviseursForm} />
                            )}
                            fullWidth
                        />
                       
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            id="multiple-limit-tags"
                            onChange={(e, value) => {
                                setCorrespondntSagSelect(value)
                            }}
                            options={correspondantSag}
                            getOptionLabel={(option) => option.NOM}
                            defaultValue={[]}
                            renderInput={(params) => (
                                <TextField {...params} label="Corespondants SAG" placeholder="Favorites" />
                            )}
                            sx={{ width: '600px' }}
                        />
                        <TextField
                            style={{ width: 300 }}
                            label="Imputation"
                            {...getFieldProps('imputation')}
                            fullWidth
                        />
                    </Stack>
                <Stack   direction="row" spacing={2} style={{marginTop: 10}}>
                <LoadingButton  type="submit" fullWidth variant="outlined" color="primary"   loading={loading2}>
                        Appliquer
                </LoadingButton>
                <LoadingButton fullWidth variant="outlined" color="secondary"
                  onClick={() => {
                    props.handleCancel2();
                  }}
                >
                    Annuler
                </LoadingButton>
                </Stack>
                </Stack>
            </Form>
        </FormikProvider>
        </>
    </Modal>
    
}

