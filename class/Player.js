import EventName from '../src/const/socketEvent';
import Card from './Card';
import CardPools from '../src/const/CardPools';

const {
  UPDATE_CARD_POOLS,
} = EventName;

export default class Player {
  constructor(name, socket) {
    this.name = name;
    this.id = socket.id;
    this.socket = socket;
    this.hp = 30;
    this.cardPools = CardPools.map(x => new Card(x));
  }

  applyDamage(damage) {
    this.hp -= damage;
  }

  get publicData() {
    return {
      name: this.name,
      id: this.id,
      hp: this.hp,
    }
  }

  updateCardPools() {
    this.socket.emit(UPDATE_CARD_POOLS, this.cardPools);
  }
}
