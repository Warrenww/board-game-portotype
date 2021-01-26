import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import logo from './logo.svg';
import './App.css';
import postData from './PostData';

const App = () => {
  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io();

    console.log(socket);
    // setSocket(socket);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
