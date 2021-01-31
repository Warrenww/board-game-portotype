import { BOARD_SIZE } from '../src/const/boardConfig';

export default class Tile {
  constructor({x,y}) {
    this.x = x;
    this.y = y;
    this.index = y * BOARD_SIZE + x;
    this.occupied = null;
  }
}
