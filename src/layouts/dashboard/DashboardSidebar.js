import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Drawer } from '@mui/material';
import { useRecoilState } from 'recoil';
import ExitIcon from '@iconify/icons-eva/log-out-outline';
import secureLocalStorage from 'react-secure-storage';

// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
import { userConnectState, authenticationState } from '../../state/atom';

//
import SidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 210;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};
const UserName = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
textAlign: 'center',
fontSize: '15px'
}));

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [userConnect, setUserConnect] = useRecoilState(userConnectState);
  const [authenticated, setAuthenticated] = useRecoilState(authenticationState);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <UserName>{userConnect.lastName}</UserName>
      <Box >
        <Logo />
      </Box>

      <NavSection navConfig={SidebarConfig()} />

      <IconButton
        variant="outlined"
        color="warning"
        sx={{
          marginTop: '50px',
          display: 'flex',
          borderRadius: '0%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'white',
          boxShadow: ' rgba(0,0,0, 0.15) -2px 2px 24px',
          '&:hover': {
            bgcolor: 'error.main',
            color: 'white'
          }
        }}
        onClick={() => {
          if (window.confirm('Logout')) {
            setUserConnect({
              id: '',
              firstName: '',
              lastName: '',
              is_admin: '',
              is_actif: '',
              is_ldap_user: '',
              is_reviewer: '',
              is_correspond_sag: '',
              qualification: '',
              email: '',
              token: ''
            });
            setAuthenticated(false);
            secureLocalStorage.removeItem('mo_user_data');
            secureLocalStorage.removeItem('mo_is_authenticated');
            navigate('/login');
          }
        }}
      >
        <Icon icon={ExitIcon} width={30} height={30} />
        Déconnexion
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
