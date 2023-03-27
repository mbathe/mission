import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import {
  useRecoilValue,
} from 'recoil';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {userConnectState} from '../state/atom';


const fDate = (date) => format(new Date(date), 'dd MMMM yyyy', { locale: fr });

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;


const getStatusLable = (code) => {
  switch (code) {
    case 0:
      return 'En Attente';
    case 1:
      return ' Accordé';
    case -1:
      return 'Rejeté';
    default:
      return '';
  }
};

const getStatusBgColor = (code) => {
  switch (code) {
    case 0:
      return 'Orange';
    case 1:
      return 'Green';
    case -1:
      return 'Red';
    default:
      return '';
  }
};

const getStatusTextColor = (code) => {
  switch (code) {
    case 0:
      return 'black';
    case 1:
      return 'white';
    case -1:
      return 'white';
    default:
      return '';
  }
};

const getStatusIcon = (code) => {
  switch (code) {
    case 0:
      return <Icon icon={clockFill} width={22} height={22} />;
    case 1:
      return <Icon icon={checkmarkCircle2Fill} width={22} height={22} />;
    case -1:
      return <Icon icon={closeCircleFill} width={22} height={22} />;
    default:
      return '';
  }
};

const getFileIconPath = (type) => {
  switch (type) {
    case 'pdf':
      return '/static/fileIcons/pdf.jpg';
    case 'doc':
      return '/static/fileIcons/docs.png';
    case 'ppt':
      return '/static/fileIcons/slides.png';
    case 'media':
      return '/static/fileIcons/media.png';
    case 'xls':
      return '/static/fileIcons/sheets.png';

    default:
      return '/static/fileIcons/file.png';
  }
};
export default function MissionOrdersDetails({ops,id,refreshState,details}) {
 // const [state, setState] = useState(details);
  const [stateRefresh, setStateRefresh] = useState(refreshState);
  const userConnect = useRecoilValue(userConnectState);
  axios.defaults.headers.common = {'Authorization': `bearer ${userConnect.token}`}
  const navigate = useNavigate();
   
  const state = details;
  console.log("reviewer........;;",state.REVISEURS)

  const getStatus =(status)=>{
    console.log("statiiiiiiiiiiiiiiiiiiiiiiiiiii,",status)
    let sta = ""
    if(status===0){
      sta = "En Attente";
     }else if(status===1){
       sta=  "Approuvé" ;
    }else{
        sta= "Rejetté"
    }
    return sta;
  }
 
  return (
    <Stack
      spacing={3}
      sx={{
        height: '100%',
        overflow: 'auto'
      }}
    >
      <Stack
        direction="row-reverse"
        spacing={2}
        sx={{
          boxShadow: ' rgba(192,192,192,0.3) -2px 2px 15px',
          padding: '5px 15px'
        }}
      >
        <div
          style={{
            backgroundColor: getStatusBgColor(state.STATUS),
            padding: '5px 10px',
            borderRadius: '25px',
            color: getStatusTextColor(state.STATUS),
            display: 'flex'
          }}
        >
          {getStatusIcon(state.STATUS)}
          <span style={{ padding: '1px' }} />
          {getStatusLable(state.STATUS)}
        </div>
        {ops.map((op) => (
          <Tooltip key={op.lable} title={op.lable}>
            <IconButton variant="contained" onClick={op.func} color={op.style || 'primary'}>
              {op.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
      <Stack
        spacing={2}
        sx={{
          boxShadow: ' rgba(192,192,192,0.3) -2px 2px 15px',
          padding: '15px',
          flexGrow: 1
        }}
      >
        <div>
          <span style={{ fontWeight: 'bold', color: 'green' }}>Informations Personnelles</span>
          <hr style={{ borderColor: 'green', marginBottom: '5px' }} />
          <Grid container spacing={2} justifyContent="left" alignItems="center">
            <Grid item md={6}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={2} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Nom </span>
                </Grid>
                <Grid item xs={9} md={10} alignItems="center">
                  <TextField value={state.NOM} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={2} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Prenom </span>
                </Grid>
                <Grid item xs={9} md={10} alignItems="center">
                  <TextField value={state.PRENOM} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={2} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Service </span>
                </Grid>
                <Grid item xs={9} md={10} alignItems="center">
                  <TextField value={state.SERVICE} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={2} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Fonction</span>
                </Grid>
                <Grid item xs={9} md={10} alignItems="center">
                  <TextField value={state.FONCTION} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: 'green' }}>Informations sur la Mission</span>
          <hr style={{ borderColor: 'green', marginBottom: '5px' }} />
          <Grid container spacing={2} justifyContent="left" alignItems="center">
            <Grid item md={12}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={1} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Objet</span>
                </Grid>
                <Grid item xs={9} md={11} alignItems="center">
                  <TextField
                    value={state.OBJET}
                    inputProps={{ readOnly: true }}
                    fullWidth
                    multiline
                    maxRows={2}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={2} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Lieu </span>
                </Grid>
                <Grid item xs={9} md={10} alignItems="center">
                  <TextField value={state.LIEU} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={3}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={4} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Type Vehicule</span>
                </Grid>
                <Grid item xs={9} md={8} alignItems="center">
                  <TextField
                    value={state.TYPE_VEHICULE}
                    inputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={4} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Marque Vehicule</span>
                </Grid>
                <Grid item xs={9} md={8} alignItems="center">
                  <TextField value={state.MARQUE} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={2} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Date de Depart </span>
                </Grid>
                <Grid item xs={9} md={10} alignItems="center">
                  <TextField value={state.DATE_DEPART} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={2} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Date de Retour</span>
                </Grid>
                <Grid item xs={9} md={10} alignItems="center">
                  <TextField value={state.DATE_RETOUR} inputProps={{ readOnly: true }} fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={1} alignItems="center" sx={{ display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}> Details </span>
                </Grid>
                <Grid item xs={12} md={11} alignItems="center">
                  <TextField
                    multiline
                    minRows={4}
                    maxRows={7}
                    fullWidth
                    value={state.DETAILS}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: 'green' }}>Reviseurs</span>
          <hr style={{ borderColor: 'green', marginBottom: '5px' }} />
          <div style={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: 'green',
                    color: 'white'
                  }}
                >
                  <TableCell align="Center" sx={{ color: 'white', fontWeight: 'bolder' }}>
                    Nom
                  </TableCell>
                  <TableCell align="Center" sx={{ color: 'white', fontWeight: 'bolder' }}>
                    Prenom
                  </TableCell>
                  <TableCell align="Center" sx={{ color: 'white', fontWeight: 'bolder' }}>
                    Qualification
                  </TableCell>
                  <TableCell align="Center" sx={{ color: 'white', fontWeight: 'bolder' }}>
                    Statut Revision
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.REVISEURS?.map((ele) => (
                  <TableRow key={ele.ID} sx={{ borderBottom: 'solid black 2px' }}>
                    <TableCell>{ele.NOM}</TableCell>
                    <TableCell>{ele.PRENOM}</TableCell>
                    <TableCell>{ele.QUALIFICATION}</TableCell>
                    <TableCell>{getStatus(ele.STATUS)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: 'green' }}>Correspondants SAG</span>
          <hr style={{ borderColor: 'green', marginBottom: '5px' }} />
          <div style={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: 'green',
                    color: 'white'
                  }}
                >
                  <TableCell align="Center" sx={{ color: 'white', fontWeight: 'bolder' }}>
                    Nom
                  </TableCell>
                  <TableCell align="Center" sx={{ color: 'white', fontWeight: 'bolder' }}>
                    Prenom
                  </TableCell>
                  <TableCell align="Center" sx={{ color: 'white', fontWeight: 'bolder' }}>
                    Qualification
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.CORRESP_SAG?.map((ele) => (
                  <TableRow key={ele.ID} sx={{ borderBottom: 'solid black 2px' }}>
                    <TableCell>{ele.NOM}</TableCell>
                    <TableCell>{ele.PRENOM}</TableCell>
                    <TableCell>{ele.QUALIFICATION}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: 'green' }}>Pieces Joints</span>
          <hr style={{ borderColor: 'green', marginBottom: '5px' }} />
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'warp' }}>
            {state.PIECES_JOINTS?.map((ele) => (
              <a
                key={ele.NOM}
                href={ele.LIEN}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '5px',
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 'solid grey 1px',
                    padding: '5px 10px',
                    borderRadius: '15px'
                  }}
                >
                  <img
                    src={getFileIconPath(ele.TYPE)}
                    alt="file logo"
                    style={{ width: 20, marginRight: 5 }}
                  />
                  <span>{ele.NOM}</span>
                </div>
              </a>
            ))}
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
}
