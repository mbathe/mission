import React, { useState, useEffect } from 'react';
import {
  useRecoilValue,
} from 'recoil';

import { Icon } from '@iconify/react';
import clipboard from '@iconify/icons-eva/clipboard-outline';
import clockfill from '@iconify/icons-eva/clock-fill';
import filetext from '@iconify/icons-eva/file-text-outline';
import person from '@iconify/icons-eva/person-outline';
import {userConnectState} from '../../state/atom';



// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const SidebarConfig =()=> {
  const userConnect = useRecoilValue(userConnectState);
  let confs =[]
  if(userConnect.is_admin ==='Y'&& userConnect.is_reviewer==='Y'){
   confs =   [
  {
    title: 'Tous les Ordres',
    path: '/dashboard/mo',
    icon: getIcon(clipboard)
  },
  {
    title: 'Mes Ordres',
    path: '/dashboard/mmo',
    icon: getIcon(filetext)
  },
  {
    title: 'À réviser',
    path: '/dashboard/reviews',
    icon: getIcon(clockfill)
  },
  {
    title: 'Utilisateurs',
    path: '/dashboard/users',
    icon: getIcon(person)
  }
  ,
  {
    title: 'Mon Compte',
    path: '/dashboard/profile',
    icon: getIcon(person)
  }
];
}else if(userConnect.is_admin ==='Y'){
  confs = [
    {
      title: 'Tous les Ordres',
      path: '/dashboard/mo',
      icon: getIcon(clipboard)
    },
    {
      title: 'Mes Ordres',
      path: '/dashboard/mmo',
      icon: getIcon(filetext)
    },
    {
      title: 'Utilisateurs',
      path: '/dashboard/users',
      icon: getIcon(person)
    }
    ,
    {
      title: 'Mon Compte',
      path: '/dashboard/profile',
      icon: getIcon(person)
    }
  ];
}else if(userConnect.is_reviewer==='Y'){
  confs = [
    {
      title: 'Tous les Ordres',
      path: '/dashboard/mo',
      icon: getIcon(clipboard)
    },
    {
      title: 'Mes Ordres',
      path: '/dashboard/mmo',
      icon: getIcon(filetext)
    },
    {
      title: 'À réviser',
      path: '/dashboard/reviews',
      icon: getIcon(clockfill)
    },
    {
      title: 'Mon Compte',
      path: '/dashboard/profile',
      icon: getIcon(person)
    }
    
  ];
}else{
  confs = [
    {
      title: 'Tous les Ordres',
      path: '/dashboard/mo',
      icon: getIcon(clipboard)
    },
    {
      title: 'Mes Ordres',
      path: '/dashboard/mmo',
      icon: getIcon(filetext)
    },
    {
      title: 'Mon Compte',
      path: '/dashboard/profile',
      icon: getIcon(person)
    }
  ];
}
return confs
}



export default SidebarConfig;
