import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import secureLocalStorage from 'react-secure-storage';
import { authenticationState, userConnectState } from '../state/atom';
import Login from './Login';

export default function Redirect() {
  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const query = useQuery();
  const path = query.get('path');
  const [authenticated, setAuthenticated] = useRecoilState(authenticationState);
  const [userConnect, setUserConnect] = useRecoilState(userConnectState);

  useEffect(() => {
    setAuthenticated(secureLocalStorage.getItem('mo_is_authenticated'));
    setUserConnect(secureLocalStorage.getItem('mo_user_data'));
  }, []);
  return (
    <>
      {/* {console.log(userConnect)} */}
      {authenticated && userConnect.token ? (
        <>
          {console.log(userConnect)}
          <Navigate to={path} replace={true} />
        </>
      ) : (
        <Login next={path} />
      )}
    </>
  );
}
