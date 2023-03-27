import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import dayjs from 'dayjs';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector
} from '@mui/x-data-grid';

const localizedTextsMap = {
  // Root
  noRowsLabel: 'No rows',
  noResultsOverlayLabel: 'No results found.',

  // Density selector toolbar button text
  toolbarDensity: 'Density',
  toolbarDensityLabel: 'Density',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comfortable',

  // Columns selector toolbar button text
  toolbarColumns: 'Columns',
  toolbarColumnsLabel: 'Select columns',

  // Filters toolbar button text
  toolbarFilters: 'Filters',
  toolbarFiltersLabel: 'Show filters',
  toolbarFiltersTooltipHide: 'Hide filters',
  toolbarFiltersTooltipShow: 'Show filters',
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Search…',
  toolbarQuickFilterLabel: 'Search',
  toolbarQuickFilterDeleteIconLabel: 'Clear',
  // Filter panel text
  filterPanelAddFilter: 'Add filter',
  filterPanelDeleteIconLabel: 'Delete',
  filterPanelLogicOperator: 'Logic operator',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: 'Columns',
  filterPanelInputLabel: 'Value',
  filterPanelInputPlaceholder: 'Filter value',

  // Filter operators text
  filterOperatorContains: 'contains',
  filterOperatorEquals: 'equals',
  filterOperatorStartsWith: 'starts with',
  filterOperatorEndsWith: 'ends with',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',
  filterOperatorIsEmpty: 'is empty',
  filterOperatorIsNotEmpty: 'is not empty',
  filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  filterValueAny: 'any',
  filterValueTrue: 'true',
  filterValueFalse: 'false',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Show columns',
  columnMenuManageColumns: 'Manage columns',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Hide column',
  columnMenuUnsort: 'Unsort',
  columnMenuSortAsc: 'Sort by ASC',
  columnMenuSortDesc: 'Sort by DESC'
};
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

const columns = [
  { field: 'ID', headerName: "Numéro d'ordre", hide: true, flex: 1 },
  {
    field: 'Auteur',
    headerName: 'Auteur',
    flex: 6,
    valueGetter: (params) => `${params.row.NOM || ''}`
  },
  {
    field: 'SERVICE',
    headerName: 'Service',
    resizable: true,
    hide: true,
    flex: 2
  },
  { field: 'FONCTION', headerName: 'Fonction', flex: 1, hide: true },
  {
    field: 'OBJET',
    flex: 7,
    headerName: 'Objet'
  },
  {
    field: 'LIEU',
    headerName: 'Lieu',
    flex: 4
  },
  {
    field: 'DATE_DEPART',
    headerName: 'Date de Depart',
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY hh:mm'),
    flex: 4
  },
  {
    field: 'DATE_RETOUR',
    headerName: 'Date de retour',
    flex: 4,
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY hh:mm')
  },
  {
    field: 'TYPE_VEHICULE',
    headerName: 'Type vehicule',
    hide: true,
    flex: 2
  },
  {
    field: 'MARQUE',
    headerName: 'Marque',
    hide: true,
    flex: 2
  },
  {
    field: 'REVISEUR_NAMES',
    headerName: 'Reviseurs',
    flex: 2,
    hide: true
  },
  {
    field: 'IMPUTATION',
    headerName: 'Imputation',
    hide: true,
    flex: 2
  },
  {
    field: 'STATUS',
    headerName: 'Status',
    align: 'right',
    headerAlign: 'center',
    flex: 4,
    renderCell: (params) => (
      <>
        <div
          style={{
            backgroundColor: getStatusBgColor(params.row.STATUS),
            padding: '5px 10px',
            borderRadius: '25px',
            color: getStatusTextColor(params.row.STATUS),
            display: 'flex'
          }}
        >
          {getStatusIcon(params.row.STATUS)}
          <span style={{ padding: '2px' }} />
          {getStatusLable(params.row.STATUS)}
        </div>
      </>
    )
  }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

export default function DataTable({ api, onClick, refresh }) {
  const [data, setData] = useState([]);
  const [loarding, setloarding] = React.useState(false);
  useEffect(() => {
    setloarding(true);
    const load = async () => {
      const dat = await api();
      setData(dat);
      setloarding(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  return (
    <>
      <Box
        sx={{
          height: '90vh',
          width: '100%'
        }}
      >
        <DataGrid
          rows={data}
          components={{
            Toolbar: CustomToolbar
          }}
          getRowId={(row) => row.ID}
          columns={columns}
          loading={loarding}
          rowsPerPageOptions={[10,25,50,100]}
          onCellDoubleClick={(props) => onClick(props.id)}
          localeText={localizedTextsMap}
        />
      </Box>
    </>
  );
}
