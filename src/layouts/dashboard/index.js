import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import secureLocalStorage from 'react-secure-storage';
import { userConnectState, authenticationState } from '../../state/atom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import LogIn from '../../pages/Login';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 10;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [userConnect, setUserConnect] = useRecoilState(userConnectState);
  const [authenticated, setAuthenticated] = useRecoilState(authenticationState);
  useEffect(() => {
    const user = secureLocalStorage.getItem('mo_user_data');
    if (user) {
      setUserConnect(user);
      setAuthenticated(secureLocalStorage.getItem('mo_is_authenticated'));
    }
  }, []);
  return (
    <>
      {authenticated ? (
        <RootStyle>
          <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
          <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
          <MainStyle>
            <Outlet />
          </MainStyle>
        </RootStyle>
      ) : (
        <>
          <LogIn />
        </>
      )}
    </>
  );
}
