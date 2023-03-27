import { atom } from 'recoil';

export const tokenState = atom({
  key: 'token',
  default: ''
});

export const userConnectState = atom({
  key: 'userConnect',
  default: {
    userId: '',
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
  }
});

export const authenticationState = atom({
  key: 'authenticated',
  default: false
})