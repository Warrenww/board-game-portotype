import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import { AppContainer } from './Components/styles';
import { Board } from './Components/Board';

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io());
  }, []);

  return (
    <AppContainer>
      <Board />
    </AppContainer>
  );
}

export default App;
