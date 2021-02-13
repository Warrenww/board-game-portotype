import React from 'react';
import { useState, useEffect, useCallback } from "react";
import { AppContainer } from './Components/styles';
import BoardDisplay
  from './Components/BoardDisplay'
  ;
import GameInfo from './Components/GameInfo';
import CardsDisplay from './Components/CardsDisplay';
import JoinGameModal from './Components/JoinGameModal';
import EndGameModule from './Components/EndGameModule';
import { message } from 'antd';
import Card from '../class/Card';
import Board from '../class/Board';
import postData from './postData';
import EventName from './const/socketEvent';

const {
  PLAYER_JOIN,
  PLAYER_JOIN_FAILED,
  CONNECT,
  MESSAGE,
  UPDATE_CARD_POOLS,
  UPDATE_BOARD,
  GAME_END,
} = EventName;

const App = () => {
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [board, setBoard] = useState(null);
  const [showEndGame, setShowEndGame] = useState(false);
  const [players, setPlayers] = useState([]);

  const Alert = useCallback(({
    content = '',
    severity = 'info',
    duration = 5,
    next,
  }) => {
    if (!['info', 'warning', 'error', 'success', 'loading'].includes(severity)) severity = 'info';
    message[severity](content, duration).then(next);
  }, []);

  useEffect(() => {
    if (gameId) {
      const webSocket = io(`/${gameId}`); // eslint-disable-line
      setSocket(webSocket);
    }
  }, [gameId]);

  useEffect(() => {
    if (socket) {
      socket.on(CONNECT, () => {
        socket.emit(PLAYER_JOIN, playerName);
      });
      socket.on(MESSAGE, Alert);
      socket.on(PLAYER_JOIN_FAILED, () => setGameId(null));
      socket.on(UPDATE_CARD_POOLS, (cards) => setCards(cards.map(card => new Card(card))));
      socket.on(UPDATE_BOARD, (b) => setBoard(new Board(b)));
      socket.on(GAME_END, (data) => {
        setPlayers(data.players);
        setShowEndGame(true);
      });
    }
  }, [socket, playerName, Alert]);

  const handleJoinGame = async (value) => {
    const { success, error ,gameId } = await postData('/api/join-game', value);
    setPlayerName(value.playerName);
    if (success) {
      // console.log(gameId);
      setGameId(gameId);
    } else {
      Alert({
        content: error,
        severity: 'error',
      });
    }
  }

  return (
    <AppContainer>
      <GameInfo
        gameId={gameId}
        socket={socket}
      />
      <BoardDisplay
        board={board}
        selectedCard={selectedCard}
        socket={socket}
      />
      <JoinGameModal
        show={gameId === null}
        onSubmit={handleJoinGame}
      />
      <CardsDisplay
        cards={cards}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
      />
      <EndGameModule
        show={showEndGame}
        players={players}
      />
    </AppContainer>
  );
}

export default App;
