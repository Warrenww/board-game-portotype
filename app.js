import { ServerStyleSheet } from 'styled-components'
import React from 'react';
import App from "./src/App";
import { renderToString } from "react-dom/server";
import Game from './class/Game';

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static("public"));
// app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const Games = [];

io.on("connection", (socket) => {
  console.log(socket.id, 'connect');

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  const sheet = new ServerStyleSheet()
  const content = renderToString(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
  sheet.seal();

  const html = `
    <html>
      <head>
        ${styleTags}
        <style>
          html, body {
            margin: 0;
          }
          body::-webkit-scrollbar { width: 0 }
        </style>
        <script type="text/javascript" src="/socket.io/socket.io.js"></script>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.post("/api/join-game", async (req, res) => {
  const { gameId } = req.body;
  const existGame = Games.find(r => r.id === gameId);
  const game = existGame ? existGame : Game.CreateGame(io);
  if (!existGame) Games.push(game);
  res.send({ success: true, gameId: game.id });
});


server.listen(8000, () => {
  console.log("listening on port 8000");
});
