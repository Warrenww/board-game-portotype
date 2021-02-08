import React, { useEffect, useState } from 'react';
import {
  Typography,
  Col,
} from 'antd';
import { GameInfoDiv, StyledPlayerInfo } from './styles';
import EventName from '../const/socketEvent';

const {
  UPDATE_PLAYERS,
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

  useEffect(() => {
    if (socket) {
      socket.on(UPDATE_PLAYERS, ({players, currentPlayer}) => {
        setPlayers(players);
        console.log(players, currentPlayer)
        setCurrentPlayer(currentPlayer);
      });
    }
  }, [socket]);

  return (
    <GameInfoDiv>
      <PlayerInfo data={players.find(x => x.id === socket.id) || {}} currentPlayer={currentPlayer}/>
      <Col xs={8}>
        <Title level={5}>game Id</Title>
        <Paragraph copyable>{gameId}</Paragraph>
      </Col>
      <PlayerInfo data={players.find(x => x.id !== socket.id) || {}} currentPlayer={currentPlayer}/>
    </GameInfoDiv>
  );
};

export default GameInfo;
