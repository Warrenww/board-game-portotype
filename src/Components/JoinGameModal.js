import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const JoinRoomModal = ({
  show,
  onSubmit
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Modal
      title="You are not in a game"
      visible={show}
      footer={null}
      maskClosable={false}
      closable={false}
    >
      <Form
        {...layout}
        name="join-game-form"
        onFinish={onSubmit}
      >
        <Form.Item
          label="Username"
          name="playerName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Join Game ID"
          name="gameId"
          extra="Leave blank to create a new game."
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default JoinRoomModal;
