import { uuidv4 } from '../utils';
import Player from './Player';

export default class Game {
  constructor(gameId, io) {
    this.id = gameId;
    this.io = io.of(`/${gameId}`);
    this.players = [];


    this.bindSocketEvents();
  }

  bindSocketEvents() {
    this.io.on('connection', socket => {
      // console.log(socket.id, 'try ro joined', this.id);

      socket.on('join game', playerName => {
        // console.log(data);
        const player = new Player(playerName, socket.id);
        if (this.players.length >= 2) {
          socket.emit('Join game failed');
          socket.emit('message', {
            content: 'Too many players',
            severity: 'error',
          });
          return ;
        }
        this.players.push(player);
        socket.broadcast.emit('message', {
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
