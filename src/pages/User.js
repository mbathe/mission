// material
import { Box, Grid, Container, Typography } from '@mui/material';

import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Input,
  DatePicker,
} from 'antd';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';



import FullFeaturedDemo from './erp/erp_ecm';



import MissionOder from './misson_oders/NewMoModal';




// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';


// ----------------------------------------------------------------------



const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const fabs = [
  {
    color: 'primary',
    sx: fabStyle,
    icon: <AddIcon />,
    label: 'Add',
  },
  {
    color: 'secondary',
    sx: fabStyle,
    icon: <EditIcon />,
    label: 'Edit',
  },
  {
    color: 'inherit',
    sx: { ...fabStyle, ...fabGreenStyle },
    icon: <UpIcon />,
    label: 'Expand',
  },
];


const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function User() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);



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
      <MissionOder open={open} loading={loading} showModal={showModal} handleOk={handleOk} handleCancel={handleCancel} />
      <Page title="ORDRE DE MISSION">
        <Container maxWidth="xl">
          <> <FullFeaturedDemo />

            <Fab sx={fabs[0].sx} aria-label={fabs[0].label} color={fabs[0].color} onClick={() => showModal()}>
              {fabs[0].icon}
            </Fab> </>
        </Container>
      </Page>
    </>

  );
}
