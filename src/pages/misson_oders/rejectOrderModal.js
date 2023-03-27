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
import Button from '@mui/material/Button';
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


export default function RejectOrderModal(props) {


    const navigate = useNavigate();
    const [onsubmit, setOnsubmit] = useState(false);
    const [anerroraccu, setOnerroraccu] = useState(false);
    const [service, setService] = useState('');
    const [typeVehicule, setTypeVehicule] = React.useState(0);
    const [TypeRevision, setTypeRevision] = React.useState(0);
    
    
    const [changeUser, setChangeUser] = React.useState(false)
   
    
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
      setLoading(true);
    }

    const [auteurId, setauteurId] = React.useState('');


    const [users, setUsers] = React.useState([])
    const [services, setServices] = React.useState([])
    const [reviseurs, setReviseurs] = React.useState([])
    const [correspondantSag, setCorrespondntSag] = React.useState([])
    const userConnect = useRecoilValue(userConnectState);
    axios.defaults.headers.common = {'Authorization': `bearer ${userConnect.token}`}

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
   
    
    const handleChangeVehicule = (event ) => {
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

       

    const handleChange1 = (event) => {
        setService(event.target.value);
    };

    const RegisterSchema = Yup.object().shape({
        reject: Yup.string()
            .min(2, 'Trop Court!')
            .max(700, 'Trop long!')
            .required('L\'objet est requis'),
          
    });

    const formik = useFormik({
        initialValues: {

            reject: '',

        },


        validationSchema: RegisterSchema,
        onSubmit: async () => {
           
           // handleClick()
            console.log("valeur")
            const newMissionOrder = {
                    mission_id: props.id,
                    reviseur_id : userConnect.userId,
                    reject_motif:values.reject,
                 }
            
            setLoading(true);
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/mission_order/reject`, newMissionOrder)
                .then((res) => { 
                    handleOk();
                    setLoading(false);
                    console.log(res); 
                    setOnerroraccu(false);
                    openSack();
                    props.refresh();
                    
                   
                 })
                .catch((error) => {setLoading(false); console.log(error);   setOnerroraccu(true) });
               
        }
    });

    const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps,  setFieldValue } = formik;


    const showModal = () => {
        props.showModal();
    };

    const handleOk = () => {
        props.handleOk();
    };

    const handleCancel = () => {
        props.handleCancel();
    };

    return <Modal
        centered={true}
        width={800}
        // height='100%'
        open={props.open}
        title="Vous êtes Sur le point de Rejeter un ordre de Mission, Veuillez entrer le motif du rejet"
        onOk={handleOk}
        closable={false}
        onCancel={handleCancel}
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
      <Alert severity="success">Ordre de mission Rejeté</Alert>
      </Snackbar>
        <FormikProvider value={formik} >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack  style={{ marginTop: 10 }}>
                    {anerroraccu && <Alert severity="error" onClose={() => { setOnerroraccu(false) }}>Une erreur est survenue, vérifier que vous avez entré un motif de refus de la mission!</Alert>}

                    <TextField
                        fullWidth
                        label="Motif"
                        multiline
                        rows={4}
                        maxRows={4}
                        {...getFieldProps('reject')}
                        error={Boolean(touched.reject && errors.reject)}
                        helperText={touched.reject && errors.reject}
                    />   
                </Stack>

                <Stack   direction="row" spacing={2} style={{marginTop: 10}}>
                <LoadingButton  type="submit" fullWidth variant="outlined" color="error"   loading={loading}>
                        Rejeter
                </LoadingButton>
                <LoadingButton fullWidth variant="outlined" color="secondary"
                  onClick={() => {
                    props.handleCancel();
                  }}
                >
                    Annuler
                </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
        </>
    </Modal>
    
}



