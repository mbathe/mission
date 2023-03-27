import React, { useState, useEffect } from 'react';
import { useParams,  Link as RouterLink, useNavigate  } from 'react-router-dom';
import { Icon } from '@iconify/react';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import editIcon from '@iconify/icons-eva/edit-2-outline';
import addIcon from '@iconify/icons-eva/file-add-outline';
import deleteIcon from '@iconify/icons-eva/close-square-outline';

import axios from 'axios';
import {
  useRecoilValue,
} from 'recoil';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';


import MissionOrderDetails from '../../components/MissionOrderDetails';
import RejectOrderModal from './rejectOrderModal';
import ValidateOrderModal from "./validateOrderModal";
import ModifyOrderModal from "./modifyOrderModal";
import {userConnectState} from '../../state/atom';


const fDate = (date) => format(new Date(date), 'dd MMMM yyyy', { locale: fr });
const getIcon = (name) => <Icon icon={name} width={22} height={22} />;




export default function Details(){
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [refreshState, setRefreshState] = useState(0);

    const [loading1, setLoading1] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [loading2, setLoading2] = useState(false);
    const [open2, setOpen2] = useState(false);
    

    const [statee, setStatee] = useState({});
    const [ops, setOps] = useState([]);

    const userConnect = useRecoilValue(userConnectState);
    axios.defaults.headers.common = {'Authorization': `bearer ${userConnect.token}`}
    const navigate = useNavigate();


    const checkIsReviewer = (reviewers, id)=>{
      let isReviewer = false;
      for(const reviewer of reviewers){
        if(reviewer.REVISEUR_ID===id && userConnect.is_reviewer==='Y'){
           isReviewer = true;
        } 
      }
      return isReviewer;
    }

    const load = async () => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/mission_order/${id}`).then(res=>{
        console.log("resultat");
        if(res.data.coresspond_sags.length!==undefined && res.data.coresspond_sags.length===0 && res.data.reviewers.length!==undefined && res.data.reviewers.length===0){
         navigate('/dashboard/notfound');
        }else{
         if(res.data.AUTEUR_ID===userConnect.userId && !checkIsReviewer(res.data.reviewers, userConnect.userId)){
          setOps([
            {
              lable: 'Modifier',
              func: () => {
                showModalModify();
              },
              icon: getIcon(editIcon),
              style: 'info'
            }
          ])
         }else if(checkIsReviewer(res.data.reviewers, userConnect.userId)){
            setOps([
              {
                lable: 'Rejeter',
                func: () => {
                  showModalReject();
                },
                icon: getIcon(deleteIcon),
                style: 'error'
              },
              {
                lable: 'Approuver',
                func: () => {
                  showModalValidate();
                },
                icon: getIcon(personAddFill)
              }
            ])
         }else{
          setOps([])
         }
         setStatee({
           ID: res.data.ID!==undefined ?res.data.ID : 0,
           USER_CREATOR :  res.data.USER_CREATOR!==undefined?res.data.USER_CREATOR :'',
           AUTEUR_ID : res.data.AUTEUR_ID !==undefined?res.data.AUTEUR_ID : '',
           LIEU: res.data.LIEU !==undefined?res.data.LIEU :'',
           OBJET : res.data.OBJET !==undefined?res.data.OBJET :'',
           DETAILS : res.data.DETAILS !==undefined?res.data.DETAILS :'',
           SERVICE: res.data.SERVICE !==undefined?res.data.SERVICE : '',
           FONCTION: res.data.FONCTION !==undefined?res.data.FONCTION :'',
           DATE_DEPART: fDate(res.data.DATE_DEPART !==undefined?res.data.DATE_DEPART : '2012-08-20T14:00:00.000Z'),
           DATE_RETOUR: fDate(res.data.DATE_RETOUR !==undefined?res.data.DATE_RETOUR :'2012-08-20T14:00:00.000Z'),
           TYPE_VEHICULE: res.data.TYPE_VEHICULE !==undefined?res.data.TYPE_VEHICULE : 0,
           MARQUE: res.data.MARQUE!==undefined  ? res.data.MARQUE: '',
           REV_TYPE: res.data.REV_TYPE!==undefined ? res.data.REV_TYPE :'',
           ALUCAM_REV_ID: res.data.ALUCAM_REV_ID!==undefined ?res.data.ALUCAM_REV_ID:null,
           STATUS: res.data.STATUS!==undefined ? res.data.STATUS : 0,
           REVISEUR_NAMES: res.data.REVISEUR_NAMES !== undefined ?res.data.REVISEUR_NAMES :'',
           CORRESP_SAG_ID: res.data.CORRESP_SAG_ID !== undefined ? res.data.CORRESP_SAG_ID : '',
           IMPUTATION: res.data.IMPUTATION !== undefined?res.data.IMPUTATION : '',
           USER_ID: res.data.USER_ID!==undefined ?res.data.USER_ID : '',
           NOM: res.data.NOM!==undefined ? res.data.NOM : '',
           PRENOM: res.data.PRENOM!==undefined ? res.data.PRENOM :'',
           EMAIL: res.data.EMAIL!==undefined ? res.data.EMAIL : '',
           REVISEURS: res.data.reviewers,
           CORRESP_SAG: res.data.coresspond_sags
         });
        // console.log("stat....................",statee)
       }
       })     
     
    
    };

    useEffect(() => {
     load();
    }, []);


    
    const showModalReject = () => {
        setOpen(true);
      };

      const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setOpen(false);
        }, 3000);
      };

      const refresh = ()=>{
        console.log("on refresh")
        console.log(refreshState);
        load();
        setRefreshState(refreshState => refreshState+1);
      }




      const showModalValidate= () => {
        setOpen1(true);
      };

      const showModalModify= () => {
        setOpen2(true);
      };

      const handleOk1 = () => {
        setLoading1(true);
        setTimeout(() => {
          setLoading1(false);
          setOpen1(false);
        }, 3000);
      };

     
/*
    const ops = [
        {
          lable: 'Rejeter',
          func: () => {
            showModalReject();
          },
          icon: getIcon(deleteIcon),
          style: 'error'
        },
        {
          lable: 'Modifier',
          func: () => {
            showModalModify();
          },
          icon: getIcon(editIcon),
          style: 'info'
        },
        {
          lable: 'Approuver',
          func: () => {
            showModalValidate();
          },
          icon: getIcon(personAddFill)
        }
      ];
      
      */

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCancel1 = () => {
    setOpen1(false);
  };

  const handleCancel2 = () => {
    setOpen2(false);
  };

    return(
        <>
            <RejectOrderModal open={open} loading={loading} id={id}  handleCancel = {handleCancel} showModalReject = {showModalReject} handleOk={handleOk}  refresh={refresh}/>
            <ValidateOrderModal open1={open1} id={id} loading1={loading1}  handleCancel1 = {handleCancel1} showModalValidate = {showModalValidate} handleOk1={handleOk1}  refresh={refresh}/>
            <MissionOrderDetails ops = {ops} id={id} refreshState={refreshState} details= {statee}/>
        </>
    )
}