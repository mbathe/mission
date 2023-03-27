import { Container } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import DataTable from '../../components/DataTable';
import { userConnectState } from '../../state/atom';



export default function Reviews() {
  const navigate = useNavigate();
  const userConnect = useRecoilValue(userConnectState);
  axios.defaults.headers.common = { Authorization: `bearer ${userConnect.token}` };
  const details = (ID) => {
    navigate(`${ID}`);
  };
  const api = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mission_order/reviewer/${userConnect.userId}`);
      console.log(res.data)
      return res.data;
    } catch (error) {
      return [];
    }
  };

  return (
    <>
      <Page title="ORDRE DE MISSION">
        <Container maxWidth="xl">
          <DataTable api={api} refresh={0} onClick={details} />
        </Container>
      </Page>
    </>
  );
}
