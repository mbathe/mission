import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { userConnectState, authenticationState } from './state/atom';

// ----------------------------------------------------------------------

export default function App() {
  const [userConnect, setUserConnect] = useRecoilState(userConnectState);
  const [authenticated, setAuthenticated] = useRecoilState(authenticationState);
  const updateToken = () => {
    console.log(userConnect)
    
  };

  useEffect(updateToken);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
