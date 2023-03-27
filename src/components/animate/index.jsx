import { Button, Modal } from 'antd';
import { useState } from 'react';

export const ButtonWithModal = ({
  buttonText,
  children,
  modalProps,
  buttonProps,
  ...props
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  return (
    <span {...props}>
      <Button onClick={() => setIsModalVisible(true)} {...buttonProps}>
        {buttonText}
      </Button>
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        {...modalProps}
      >
        {children(closeModal)}
      </Modal>
    </span>
  );
};

