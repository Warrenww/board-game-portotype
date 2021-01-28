import React, { useEffect, useState } from 'react';
import {
  Typography,
  Col,
} from 'antd';
import { GameInfoDiv } from './styles';
import EventName from '../const/socketEvent';

const {
  UPDATE_PLAYERS,
} = EventName;
const { Paragraph, Title } = Typography;

const PlayerInfo = ({data}) => {
  const { name } = data;
  return (
    <Col xs={8}>
      <Title level={4}>{name || '-'}</Title>
      <Paragraph>hp: {30}</Paragraph>
    </Col>
  )
}

const GameInfo = ({
  gameId,
  socket,
}) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on(UPDATE_PLAYERS, players => setPlayers(players));
    }
  }, [socket]);

  return (
    <GameInfoDiv>
      <PlayerInfo data={players.find(x => x.id === socket.id) || {}}/>
      <Col xs={8}>
        <Title level={5}>game Id</Title>
        <Paragraph copyable>{gameId}</Paragraph>
      </Col>
      <PlayerInfo data={players.find(x => x.id !== socket.id) || {}}/>
    </GameInfoDiv>
  );
};

export default GameInfo;
