import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {tokenState} from '../../state/atom';


const AntDesignStyledDataGridPro = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.mode === 'light'
          ? 'rgba(0,0,0,.85)'
          : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 600,
  width: '100%',
  '& .MuiFormGroup-options': {
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    '& > div': {
      minWidth: 100,
      margin: theme.spacing(2),
      marginLeft: 0,
    },
  },
}));

function SettingsPanel(props) {
  const { onApply, type, size, theme } = props;
  const [sizeState, setSize] = React.useState(size);
  const [typeState, setType] = React.useState(type);
  const [selectedPaginationValue, setSelectedPaginationValue] = React.useState(-1);
  const [activeTheme, setActiveTheme] = React.useState(theme);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event) => {
    setType(event.target.value);
    props.setType(event.target.value)
    console.log("on passe ici");
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleThemeChange = React.useCallback((event) => {
    setActiveTheme(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
      theme: activeTheme,
    });
  }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

  return (
    <>
    
    </>
  );
}

SettingsPanel.propTypes = {
  onApply: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['ant', 'default']).isRequired,
  type: PropTypes.oneOf(['Élèves', 'Etablissement']).isRequired,
  
};

export default function FullFeaturedDemo() {
  const [isAntDesign, setIsAntDesign] = React.useState(false);
  const [type, setType] = React.useState('Élèves');
  const [size, setSize] = React.useState(100);
  const [datas,setDatas]=React.useState({columns:[],rows:[]});
  const [loarding,setloarding]=React.useState(false)
  const [isfirst,setIsfirst]=React.useState(true);
  const [token, setToken] = useRecoilState(tokenState);
  const navigate = useNavigate();

 

 
  
  const config = {
    headers: { Authorization: `${token}` }
  };
  axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
  const columnse = [
    { field: 'type', headerName: 'Nom', width: 150 },
     { field: 'name', headerName: 'Prénom', width: 300 },
    { field: 'country', headerName: 'Sexe', width: 150 }, 
    { field: 'city', headerName: 'Date de naissance', width: 150 },
    { field: 'phone', headerName: 'Lieu de naissance', width: 150 },
  
    { field: 'email', headerName: 'Ecole', width: 150 },
  
    { field: 'site', headerName: 'Adresse', width: 150 }, 
    { field: 'note', headerName: 'Numéro du groupe', width: 150 },
    { field: 'portable', headerName: 'Téléphone parent', width: 150 },
    { field: 'createAt', headerName: 'CreateAt', type: "dateTime", width: 180 },
    { field: 'updateAt', headerName: 'UpdateAt',type: "date", width: 150 },
  
  ]

  const columnsEnseignant = [
    { field: 'nom', headerName: 'Nom', width: 150 },
     { field: 'enseignement', headerName: 'Enseignement', width: 150 },
    { field: 'Systeme', headerName: 'Système', width: 150 }, 
    { field: 'nomDirecteur', headerName: 'Nom du Directeur', width: 150 },
    { field: 'telephoneDirecteur', headerName: 'Téléphone directeur', width: 150 },
  
    { field: 'donateur', headerName: 'Donateur', width: 150 },
  
    { field: 'dateCreationEcole', headerName: 'Date de création', width: 150 }, 
    { field: 'materiauxConstruction', headerName: 'Materiaux', width: 150 },
    { field: 'pays', headerName: 'Pays', width: 150 },
    { field: 'region', headerName: 'Region', width: 150 },
    { field: 'Departement', headerName: 'Departement', width: 150 },
    { field: 'quartier', headerName: 'Quartier', width: 150 },
    { field: 'createAt', headerName: 'CreateAt', type: "dateTime", width: 180 },
    { field: 'updateAt', headerName: 'UpdateAt',type: "date", width: 150 },
  ]
    
  React.useEffect(() => {  
      setloarding(true)
      if(type==="Élèves"){
      
        setloarding(false)
            setDatas({columns:columnse,rows:[]});
      // eslint-disable-next-line no-empty
      }else{
        axios.get('http://localhost:3000/api/etablissement')
          .then((res)=>{     
            const rowsetablissement = res.data.map((value) => {
              const val =  {
              id:value._id,
              nom: value.nom,
              enseignement:value.enseignement,
              systeme:value.systeme,
              nomDirecteur:value.nomDirecteur,
              adresse:value.adresse.pays,
              departement:value.adresse.departement,
              region:value.adresse.region,
              quartier : value.adresse.quartier,
              dateCreationEcole:value.dateCreationEcole,
              telephoneDirecteur:value.telephoneDirecteur,
              donateur:value.donateur,
              materiauxConstruction:value.materiauxConstruction,
              createAt: value.createAt,
              updateAt:value.updateAt
              }
             return val;
            })
            setloarding(false)
            setDatas({columns:columnsEnseignant, rows:rowsetablissement});
          
         })
        .catch((error)=>{console.log(error); setloarding(false)});
      }
      
       setIsfirst(false);
       
  },[type]);

 
  const data1={
    columns: [{ field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },],
    rows: [{ id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' }]
  }
 

 // console.log(data);
  const [pagination, setPagination] = React.useState({
    
    autoPageSize: false,
    pageSize: undefined,
  });

  const getActiveTheme = () => {
    if(isAntDesign){
      return  'ant' ;
    // eslint-disable-next-line no-else-return
    }else {
      return 'default';
    }
  
  };

  const handleApplyClick = (settings) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
    
      setType(settings.type);
      
    }

    if (getActiveTheme() !== settings.theme) {
      setIsAntDesign(!isAntDesign);
    }

    if (size !== settings.size || type !== settings.type) {
     console.log("bonjour")
      
    }

    const newPaginationSettings = {
      pagination: settings.pagesize !== -1,
      autoPageSize: settings.pagesize === 0,
      pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
    };

    setPagination((currentPaginationSettings) => {
      if (
        currentPaginationSettings.pagination === newPaginationSettings.pagination &&
        currentPaginationSettings.autoPageSize ===
          newPaginationSettings.autoPageSize &&
        currentPaginationSettings.pageSize === newPaginationSettings.pageSize
      ) {
        return currentPaginationSettings;
      }
      return newPaginationSettings;
    });
  };

  const DataGridComponent = isAntDesign ? AntDesignStyledDataGridPro : DataGrid;
  const checkboxSelection = true;
  return (
    <StyledBox>
      <SettingsPanel
        onApply={handleApplyClick}
        size={size}
        type={type}
        theme={getActiveTheme()}
        setType={(type)=>{setType(type); }}
      />
      <DataGridComponent
        {...datas}
        components={{
          Toolbar: GridToolbar,
        }}
        loading={loarding}
        checkboxSelection={checkboxSelection}
        onCellDoubleClick={(params, event) => {
          console.log(params.id)
          navigate('/student',{
            state: params.id
    });
          if (!event.ctrlKey) {
            event.defaultMuiPrevented = true;
          }
        }}
        initialState={{ pinnedColumns: { left: ['__check__', 'desk'] } }}
        {...pagination}
      />
    </StyledBox>
  );
}