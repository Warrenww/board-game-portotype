import { ServerStyleSheet } from 'styled-components'
import React from 'react';
import App from "./src/App";
import { renderToString } from "react-dom/server";
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');

const app = express();

const server = http.createServer(app);

const io = socketIo(server,{
  cors: {
    origin: "*:*",
  }
});

app.use(express.static("public"));
// app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

io.on("connection", (socket) => {
  console.log(socket.id, 'connect');

  socket.on('join room', (room) => {
    socket.join(room);
    io.to(room).emit("message", "someone joined the room");
  });



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

app.post("/", (req, res) => {
  console.log(req.body);
  // res.send("Server is running");
});


server.listen(8000, () => {
  console.log("listening on port 8000");
});
