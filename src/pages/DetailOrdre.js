// material
import { Container, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import React, { useState } from 'react';



import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';



import FullFeaturedDemo from './erp/erp_ecm';






// components
import Page from '../components/Page';



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




export default function DetailOrdre() {

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
      <Page title="ORDRE DE MISSION">
        <Container maxWidth="xl"
            sx={{
                height:'90vh'

            }}

        >
          <> 
      
                <Stack  
                  sx = {{
                    position: 'relative',
                    top:'50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                  spacing={3}>
                         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField 
                              fullWidth
                              id="outlined-basic" label="Outlined" variant="outlined" />
                            <TextField 
                             fullWidth
                             id="filled-basic" label="Filled" variant="filled" />
                         </Stack>
                         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField 
                              fullWidth
                              id="outlined-basic" label="Outlined" variant="outlined" />
                            <TextField 
                             fullWidth
                             id="filled-basic" label="Filled" variant="filled" />
                         </Stack>
                              
                    </Stack>
       
          </>
        </Container>
      </Page>
    </>

  );
}
