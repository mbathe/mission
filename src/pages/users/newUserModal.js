import React from 'react';
import { Modal } from 'antd';
import RegisterForm from './RegisterForm';

export default function NewUserModal({open, handleCancel}) {
  
  
  return (
    <Modal
      centered={true}
      width={500}
      open={open}
      title="Nouvel Utilisateur"
      onCancel={handleCancel}
      footer={[]}
    >
      <RegisterForm onSubmit={handleCancel}/>
    </Modal>
  );
}
