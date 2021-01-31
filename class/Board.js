import { BOARD_SIZE } from '../src/const/boardConfig';
import Tile from './Tile';
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

  validateTile({x, y}){
    const exist = this.getTileByCoord({x, y});
    if(exist && exist.occupied === null) return true;
    return false;
  }

  pseudoPlace(tileId, card) {
    const t = this.getTileByIndex(tileId);
    const coverTiles = card.relativeShape.map(({x, y}) => ({x: t.x + x, y: t.y + y}));
    return {
      valid: coverTiles.every(({x, y}) => this.validateTile({x, y})),
      tiles: coverTiles.filter(({x, y}) => this.validateTile({x, y})).map(({x, y}) => this.getTileByCoord({x, y})),
    };
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
