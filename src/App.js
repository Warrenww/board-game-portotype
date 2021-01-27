import React from 'react';
import { useState, useEffect, useCallback } from "react";
import { AppContainer } from './Components/styles';
import Board from './Components/Board';
import GameInfo from './Components/GameInfo';
import JoinGameModal from './Components/JoinGameModal';
import { message } from 'antd';
import postData from './postData';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState(null);

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
      socket.on('connect', () => {
        setSocketId(socket.id);
        socket.emit('join game', playerName);
      });
      socket.on('message', Alert);
      socket.on('Join game failed', () => setGameId(null));
    }
  }, [socket, playerName, Alert]);

  const handleJoinGame = async (value) => {
    const { success, error ,gameId } = await postData('/api/join-game', value);
    setPlayerName(value.playerName);
    if (success) {
      console.log(gameId);
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
      <GameInfo gameId={gameId}/>
      <Board />
      <JoinGameModal
        show={gameId === null}
        onSubmit={handleJoinGame}
      />
    </AppContainer>
  );
}

export default App;
