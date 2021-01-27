import React from 'react';
import { Typography  } from 'antd';

const { Paragraph } = Typography;

const GameInfo = ({
  gameId,
}) => {

  return (
    <Paragraph copyable>game Id: {gameId}</Paragraph>
  );
};

export default GameInfo;
