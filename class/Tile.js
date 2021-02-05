import { BOARD_SIZE } from '../src/const/boardConfig';

export default class Tile {
  constructor({x,y, occupied}) {
    this.x = x;
    this.y = y;
    this.index = y * BOARD_SIZE + x;
    this.occupied = occupied ?? null;
  }
}
