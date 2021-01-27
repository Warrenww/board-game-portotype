import { uuidv4 } from '../utils';
import Player from './Player';
import EventName from '../src/const/socketEvent';
const {
  PLAYER_JOIN,
  PLAYER_JOIN_FAILED,
  MESSAGE,
  UPDATE_PLAYERS,
} = EventName;

export default class Game {
  constructor(gameId, io) {
    this.id = gameId;
    this.io = io.of(`/${gameId}`);
    this.players = [];


    this.bindSocketEvents();
  }

  bindSocketEvents() {
    this.io.on('connection', socket => {
      console.log(socket.id, 'try ro joined', this.id);

      socket.on(PLAYER_JOIN, playerName => {
        const player = new Player(playerName, socket.id);
        if (this.players.length >= 2) {
          socket.emit(PLAYER_JOIN_FAILED);
          socket.emit(MESSAGE, {
            content: 'Too many players',
            severity: 'error',
          });
          return ;
        }
        this.players.push(player);
        this.io.emit(UPDATE_PLAYERS, this.players);
        socket.broadcast.emit(MESSAGE, {
          content: `${player.name} join the game`,
          severity: 'success',
        });
      });
    });

  }

  async join(playerName, socketId){

  }

  static CreateGame(io) {
    const gameId = uuidv4().split('-')[0];
    return new Game(gameId, io);
  }

}
