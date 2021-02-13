import React from 'react';
import {
  Modal,
  Descriptions,
  Row,
  Col,
} from 'antd';
import {
  CrownOutlined,
} from '@ant-design/icons';

const PlayerInfo = ({player}) => {
  const {
    name,
    hp,
    static: {
      cardPlaced,
    }
  } = player;

  return (
    <Col xs={12}>
      <Descriptions title={<>{name} {hp > 0 ? <CrownOutlined /> : <></>}</>}>
        <Descriptions.Item label="Hp">{hp}</Descriptions.Item>
        <Descriptions.Item label="Card Placed">{cardPlaced}</Descriptions.Item>
      </Descriptions>
    </Col>
  )
};

const EndGameModule = ({
  show,
  players,
}) => {
  return (
    <Modal
      title="Game Over"
      visible={show}
      footer={null}
      maskClosable={false}
      closable={false}
    >
      <Row>
        { (players || []).map(p => <PlayerInfo key={p.id} player={p} />) }
      </Row>
    </Modal>
  );
};

export default EndGameModule;
