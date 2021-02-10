import { uuidv4 } from '../utils';
import Player from './Player';
import Board from './Board';
import EventName from '../src/const/socketEvent';
const {
  PLAYER_JOIN,
  PLAYER_JOIN_FAILED,
  MESSAGE,
  UPDATE_PLAYERS,
  PLACE_TILE,
} = EventName;

export default class Game {
  constructor(gameId, io) {
    this.id = gameId;
    this.io = io.of(`/${gameId}`);
    this.players = [];
    this.board = new Board({game:this});
    this.currentPlayerIdx = null;
    this.start = false;

    this.bindSocketEvents();
  }

  bindSocketEvents() {
    this.io.on('connection', socket => {
      console.log(socket.id, 'try to joined', this.id);

      socket.on(PLAYER_JOIN, playerName => this.playerJoin(socket, playerName));
      socket.on(PLACE_TILE, async ({ tile, selectedCard }) => {
        const player = this.getPlayerById(socket.id);
        try {
          await this.board.place({player, tile, selectedCard});
        } catch (err) {
          console.log(err);
          socket.emit(MESSAGE, {
            content: err.toString(),
            severity: 'error',
          });
        }

      });
    });

  }

  playerJoin(socket, playerName) {
    if (this.players.length >= 2) {
      socket.emit(PLAYER_JOIN_FAILED);
      socket.emit(MESSAGE, {
        content: 'Too many players',
        severity: 'error',
      });
      return ;
    }
    const player = new Player(playerName, socket);

    this.players.push(player);
    socket.broadcast.emit(MESSAGE, {
      content: `${player.name} join the game`,
      severity: 'success',
    });
    if (this.players.length === 2) {
      this.start = true;
      this.currentPlayerIdx = parseInt(Math.random() * 2);
      this.players.forEach(p => p.updateCardPools());
      this.board.SendBoardToClient();
    }
    this.sendPlayersToClient();
  }

  switchPlayer() {
    this.currentPlayerIdx = ((this.currentPlayerIdx + 1) % 2);
    this.sendPlayersToClient();
  }

  checkIsCurrentPlayer(player) {
    return player === this.players[this.currentPlayerIdx];
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIdx];
  }

  getPlayerById(id) {
    return this.players.find(p => p.id === id);
  }

  applyDamageToOther(player, damage) {
    const target = this.players.find(p => p.id === player.id);
    target.applyDamage(damage);
    const endGame = this.checkEndGame();
    if (!endGame) this.sendPlayersToClient();
  }

  checkEndGame() {
    const dead = this.players.every(p => p.hp <= 0);
    if (dead) {
      this.io.emit(MESSAGE, {
        content: `${dead.name} lose the game`,
        severity: 'success',
      });
    }
    return dead;
  }

  sendPlayersToClient() {
    this.io.emit(UPDATE_PLAYERS, {
      players: this.players.map(p => p.publicData),
      currentPlayer: this.players[this.currentPlayerIdx]?.id,
    });
  }

  static CreateGame(io) {
    const gameId = uuidv4().split('-')[0];
    return new Game(gameId, io);
  }

}
