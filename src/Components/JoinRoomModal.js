import React from 'react';
import { Modal } from 'antd';

const JoinRoomModal = ({
  show,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal title="Basic Modal" visible={show} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

export default JoinRoomModal;
