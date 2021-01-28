import { BOARD_SIZE } from '../src/const/boardConfig';
import Tile from './Tile';

export default class Board {
  constructor(game) {
    this.tiles = [];
    this.game = game;

    for (let i = 0; i < BOARD_SIZE; i ++) {
      for (let j = 0; j < BOARD_SIZE; j ++) {
        this.tiles.push(new Tile(i, j));
      }
    }
  }
}
