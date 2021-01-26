const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');

const app = express();

const server = http.createServer(app);

const io = socketIo(server,{ origins: '*:*'});

// app.use(express.static("./public"));
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

io.on("connection", (socket) => {
  console.log(socket.id);

  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/", (req, res) => {
  console.log(req.body);
  // res.send("Server is running");
});


server.listen(8000, () => {
  console.log("listening on port 8000");
});
