import React, { useEffect, useState } from 'react';
import {
  Typography,
  Col,
} from 'antd';
import {
  FastForwardOutlined,
} from '@ant-design/icons';
import {
  GameInfoDiv,
  StyledPlayerInfo,
  FunctionButton,
} from './styles';
import EventName from '../const/socketEvent';

const {
  UPDATE_PLAYERS,
  SKIP,
  FREE_SKIP,
} = EventName;
const { Paragraph, Title } = Typography;

const PlayerInfo = ({data, currentPlayer}) => {
  const { name, hp } = data;
  return (
    <StyledPlayerInfo xs={8} current={data.id === currentPlayer}>
      <Title level={4}>{name || '-'}</Title>
      <Paragraph>hp: {hp}</Paragraph>
    </StyledPlayerInfo>
  )
}

const GameInfo = ({
  gameId,
  socket,
}) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] =useState(null);
  const [freeSkip, setFreeSkip] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on(UPDATE_PLAYERS, ({players, currentPlayer}) => {
        setPlayers(players);
        setCurrentPlayer(currentPlayer);
      });
      socket.on(FREE_SKIP, (value) => setFreeSkip(value));
    }
  }, [socket]);

  const handleSkip = () => {
    if (socket) {
      socket.emit(SKIP);
    }
  }

  return (
    <GameInfoDiv>
      <PlayerInfo data={players.find(x => x.id === socket.id) || {}} currentPlayer={currentPlayer}/>
      <Col xs={8}>
        <Title level={5}>game Id</Title>
        <Paragraph copyable>{gameId}</Paragraph>
      </Col>
      <PlayerInfo data={players.find(x => x.id !== socket.id) || {}} currentPlayer={currentPlayer}/>
      <FunctionButton
        type="default"
        backgroundColor={freeSkip ? '#43b34b' : '#da5656'}
        shape="circle"
        bottom={6}
        onClick={() => handleSkip()}
        icon={<FastForwardOutlined />}
      />
    </GameInfoDiv>
  );
};

export default GameInfo;
