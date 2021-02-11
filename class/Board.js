import { BOARD_SIZE } from '../src/const/boardConfig';
import Tile from './Tile';
import Card from './Card';
import EventName from '../src/const/socketEvent';
const {
  UPDATE_BOARD,
} = EventName;

export default class Board {
  constructor({ game, tiles}) {
    this.tiles = tiles?.map(t => new Tile(t)) || Board.createEmptyBoardTiles();
    this.game = game;
    this.io = game?.io;
  }

  getTileByCoord({x, y}) { return this.tiles.find(t => (t.x === x && t.y === y)); }
  getTileByIndex(idx) { return this.tiles.find(t => t.index === idx); }

  getRow(idx) { return Array(BOARD_SIZE).fill().map((_, col) => this.getTileByIndex(idx * BOARD_SIZE + col)); }
  getColumn(idx) { return Array(BOARD_SIZE).fill().map((_, row) => this.getTileByIndex(row * BOARD_SIZE + idx)); }

  checkFullStack() {
    const result = [];
    for (let i = 0; i < BOARD_SIZE; i ++) {
      const r = this.getRow(i);
      const c = this.getColumn(i);

      if(r.every(t => (t.occupied !== null))) result.push(r);
      if(c.every(t => (t.occupied !== null))) result.push(c);
    }

    return result;
  }

  validateTile({x, y}){
    const exist = this.getTileByCoord({x, y});
    if(exist && exist.occupied === null) return true;
    return false;
  }

  pseudoPlace(tile, card) {
    const t = Number(tile) ? this.getTileByIndex(tile) : this.getTileByCoord(tile);
    const coverTiles = card.relativeShape.map(({x, y}) => ({x: t.x + x, y: t.y + y}));
    return {
      valid: coverTiles.every(({x, y}) => this.validateTile({x, y})),
      tiles: coverTiles.filter(({x, y}) => this.validateTile({x, y})).map(({x, y}) => this.getTileByCoord({x, y})),
    };
  }

  async place({ player, tile, selectedCard}) {
    if (!this.game.checkIsCurrentPlayer(player)) {
      return Promise.reject('Not your turn');
    }

    const result = this.pseudoPlace(tile, new Card(selectedCard));
    if (!result.valid) {
      return Promise.reject('Invalid placement.');
    }

    const c_player = this.game.currentPlayer;

    result.tiles.forEach(tile => tile.occupied = player.id);
    const fullstack = this.checkFullStack();
    const damage = await fullstack.reduce(async (acc, curr) => {
      const d = await curr.reduce(async (a, t) => {
      //   if (t.effect?.trigger === 'onclear') {
      //     console.log(t.effect);
      //     const result = await t.effect?.dispatch({
      //       player: this.game.getPlayerById(t.occupied),
      //       tiles: curr.filter(x => x.effect?.trigger === 'onclear'),
      //       board: this,
      //     });
      //     console.log(result);
      //     if (result) t.effect = null;
      //   } else if (t.effect?.trigger === 'exist') {
      //     t.clearEffect();
      //     t.effect = null;
      //   }
      //   t.render();
        const tmp = await a + (t.occupied === c_player.id ? 1 : 0);
        t.occupied = null;
        return Promise.resolve(tmp);
      }, 0);
      return Promise.resolve(await acc + d);
    }, 0);
    this.game.applyDamageToOther(player,damage);


    this.game.resetSkip();
    this.SendBoardToClient();
    this.game.switchPlayer();
    return Promise.resolve();
  }

  clear() {
    this.tiles.forEach(t => {
      t.occupied = null;
    });
    this.SendBoardToClient();
  }

  get publicData() {
    return {
      tiles: this.tiles,
    }
  }

  SendBoardToClient() {
    this.io.emit(UPDATE_BOARD, this.publicData);
  }

  static createEmptyBoardTiles() {
    const tiles = [];
    for (let i = 0; i < BOARD_SIZE; i ++) {
      for (let j = 0; j < BOARD_SIZE; j ++) {
        tiles.push(new Tile({x:i, y:j}));
      }
    }

    return tiles;
  }

}
