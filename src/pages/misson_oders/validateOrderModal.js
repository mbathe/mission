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
import { tokenState, userConnectState } from '../../state/atom';








export default function ValidateOrderModal(props) {


    const [anerroraccu, setOnerroraccu] = useState(false);
    const [service, setService] = useState('');
    const [typeVehicule, setTypeVehicule] = React.useState(0);
    const [TypeRevision, setTypeRevision] = React.useState(0);

    const [loading1, setLoading1] = React.useState(false);
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
    axios.defaults.headers.common = { 'Authorization': `bearer ${userConnect.token}` }
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

    const handleChangeVehicule = (event) => {
        setTypeVehicule(event.target.value);
    };

    const handleChangeRevision = (event) => {
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



 
    const RegisterSchema = Yup.object().shape({
        objet: Yup.string()
            .min(2, 'Trop Court!')
            .max(700, 'Trop long!')
            .required('L\'objet est requis'),
        ville: Yup.string().min(2, 'Too Short!').max(200, 'Too Long!').required('Le lieu est requis'),
        service: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Le service est requis'),
        fonction: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Votre fonction est requise'),
        nom: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Le nom est requis'),
        reviseursForm: Yup.array()
            .of(
                Yup.object().shape({
                    NOM: Yup.string()
                        .max(255)
                        .required()
                        .label('NOM')
                    ,
                    USER_ID: Yup.string()
                        .max(255)
                        .required()
                        .label('USER_ID')
                }),

            )
            .min(1, 'Au moins un reviseurs est requis')
    });

    const showModal1 = () => {
        props.showModal();
    };

    const handleOk1 = () => {
        props.handleOk1();
    };

    const handleCancel1 = () => {
        props.handleCancel();
    };

    const newValidate = {
        mission_id: props.id,
        reviseur_id: userConnect.userId,
    }

    return <Modal
        centered={true}
        width={800}
        // height='100%'
        open={props.open1}
        title="Vous êtes Sur le point de Valider un ordre de Mission"
        onOk={handleOk1}
        closable={false}
        onCancel={handleCancel1}
        footer={[
        ]}
    >
        <>
            <Snackbar
                open={sackOpen}
                autoHideDuration={7000}
                onClose={handleClose}
                message="Note archived"
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            >
                <Alert severity="success">Ordre de mission Approuver avec success</Alert>
            </Snackbar>
            {anerroraccu && <Alert severity="error" onClose={() => { setOnerroraccu(false) }}>Une erreur est survenue, votre acces au réseau</Alert>}
            <Stack direction="row" spacing={2} style={{ marginTop: 10 }}>
                <LoadingButton fullWidth variant="outlined" color="primary"
                    onClick={() => {
                        setLoading1(true);

                        axios.put(`${process.env.REACT_APP_BACKEND_URL}/mission_order/approuve`, newValidate)
                            .then((res) => {
                                handleOk1();
                                console.log(res);
                                setOnerroraccu(false);
                                openSack();
                                props.refresh();


                            })
                            .catch((error) => { setLoading(false); console.log(error); setOnerroraccu(true) });
                    }}>
                    Approuver
                </LoadingButton>
                <LoadingButton fullWidth variant="outlined" color="secondary"
                    onClick={() => {
                        props.handleCancel1();
                    }}
                >
                    Annuler
                </LoadingButton>
            </Stack>
        </>
    </Modal>

}



