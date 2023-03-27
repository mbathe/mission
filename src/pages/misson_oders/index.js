import { Container } from '@mui/material';
import axios from 'axios';
import {
  useRecoilValue,
} from 'recoil';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import DataTable from '../../components/DataTable';
import NewMoModal from './NewMoModal';
import {userConnectState} from '../../state/atom';




const api =  async()=>{
  try{
   const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mission_order`);
    return res.data;
  }catch(error){
    return [] 
  }
   
  
};
        
      


const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };


  
  

export default function MissionOder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [refreshState, setRefreshState] = useState(0);
  const userConnect = useRecoilValue(userConnectState);
  axios.defaults.headers.common = {'Authorization': `bearer ${userConnect.token}`}


  const refresh = ()=>{
    console.log("on refresh")
    console.log(refreshState);
    setRefreshState(refreshState => refreshState+1);
  }

  const details = (id) => {
    navigate(`${id}`)
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <NewMoModal open={open} loading={loading} showModal={showModal} handleOk={handleOk} handleCancel= {handleCancel} refresh={refresh} />
      <Page title="ORDRE DE MISSION">
        <Container maxWidth="xl">
          <DataTable api={api} refresh={refreshState} onClick={details} />
          
          <Fab sx={fabStyle} aria-label='Add' color='primary' onClick={() => showModal()}>
          <AddIcon />
            </Fab>
        </Container>
      </Page>
    </>
  );
}
