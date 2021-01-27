import React from 'react';
import { useState, useEffect } from "react";
// import { io } from 'socket.io-client';
import { AppContainer } from './Components/styles';
import Board from './Components/Board';
import JoinRoomModal from './Components/JoinRoomModal';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:8000'); // eslint-disable-line
    setSocket(socket);

    socket.on('message', msg => alert(msg));
  }, []);

  const handleOk = () => {
    socket.emit('join room', 'test');
    setRoomId(10);
  }

  return (
    <AppContainer>
      <Board />
      <JoinRoomModal
        show={roomId === null}
        handleOk={handleOk}
        handleCancel={() => setRoomId(10)}
      />
    </AppContainer>
  );
}

export default App;
