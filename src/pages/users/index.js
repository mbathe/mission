import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector
} from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import NewUserModal from './newUserModal';

const localizedTextsMap = {};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}
const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16
};

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setloading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const load = async () => {
    setloading(true);
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/all`);
    setData(res.data);
    setloading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const columns = [
    {
      field: 'NOM',
      headerName: 'NOM',
      flex: 2,
    },
    {
      field: 'EMAIL',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'QUALIFICATION',
      headerName: 'Qualification',
      flex: 1
    },
    {
      field: 'IS_ACTIF',
      headerName: 'Actif',
      renderCell: (params) => (
        <Switch
          checked={params.row.IS_ACTIF === 'Y'}
          onChange={() => {
            console.log("request..................",params.row.IS_ACTIF)
            setloading(true);
            const body = {
              is_actif: params.row.IS_ACTIF === 'Y' ? 'N' : 'Y'
            };
            console.log({ body });
            axios
              .put(`${process.env.REACT_APP_BACKEND_URL}/user/actif/${params.row.USER_ID}`, body)
              .then((res) => {
                console.log(res);
                load().then(() => {
                  console.log(params.row);
                });
              });
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )
    },
    {
      field: 'IS_ADMIN',
      // hide: true,
      headerName: 'Admin',
      renderCell: (params) => (
        <Switch
          checked={params.row.IS_ADMIN === "Y"}
          onChange={() => {
            setloading(true);
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/admin/${params.row.USER_ID}`, {
              is_admin: params.row.IS_ADMIN === "Y" ? "N" : "Y"
            }).then((res) => {
              console.log(res)
              load()

            })
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )
    },
    {
      field: 'IS_LDAP_USER',
      headerName: 'Ldap',
      renderCell: (params) => (
        <Switch
          checked={params.row.IS_LDAP_USER === 'Y'}
          onChange={() => {
            /*
            setloading(true);
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/admin/${params.row.USER_ID}`, {
              is_ldap_user: params.row.IS_ACTIF === 'Y' ? 'N' : 'Y'
            }).then((res) => {
              console.log(res)
              load()

            })
            */
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )
    },
    {
      field: 'IS_REVIEWER',
      headerName: 'Reviewer',
      renderCell: (params) => (
        <Switch
          checked={params.row.IS_REVIEWER === 'Y'}
          onChange={() => {
            setloading(true);
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/reviewer/${params.row.USER_ID}`, {
              is_reviewer: params.row.IS_REVIEWER === "Y" ? "N" : "Y"
            }).then((res) => {
              console.log(res)
              load()

            })
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )
    },
    {
      field: 'IS_CORRESPOND_SAG',
      headerName: 'Correspondant SAG',
      renderCell: (params) => (
        <Switch
          checked={params.row.IS_CORRESPOND_SAG === 'Y'}
          onChange={() => {
            setloading(true);
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/correspondandsag/${params.row.USER_ID}`, {
              is_correspond_sag: params.row.IS_CORRESPOND_SAG === "Y" ? "N" : "Y"
            }).then((res) => {
              console.log(res)
              load()

            })
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )
    }
  ];

  return (
    <>
      <>
        <Box
          sx={{
            height: '90vh',
            width: '100%'
          }}
        >
          <NewUserModal open={open} handleCancel={handleCancel}/>
          <DataGrid
            rows={data}
            components={{
              Toolbar: CustomToolbar
            }}
            getRowId={(row) => row.USER_ID}
            columns={columns}
            loading={loading}
            rowsPerPageOptions={[15, 25, 50, 100]}
            localeText={localizedTextsMap}
            onCellDoubleClick={(props) => {
              console.log(props.row);
            }}
          />
          <Fab sx={fabStyle} aria-label='Add' color='primary' onClick={() => showModal()}>
          <AddIcon />
            </Fab>
        </Box>
      </>
    </>
  );
}
