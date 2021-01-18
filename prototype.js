class Player{
  constructor({name, id,}) {
    this.id = id;
    this.name = name;
    this.hp = 30;
  }
}

class Tile {
  constructor(id){
    this.id = id;
    this.occupied = '';
    this.dom = document.createElement('div');

    this.dom.place = this.place;
    this.dom.tileId = this.id;
    $(this.dom).addClass('tile');
  }

  render() {
    if (this.occupied !== '') {
      $(this.dom).attr('occupied', this.occupied === myId ? 'self' : 'other');
    }
    else $(this.dom).attr('occupied', null);
  }
}

class Board {
  constructor(){
    this.dom = $("#board");
    this.tiles = [];
    this.occupied = [];

    for (let i = 0; i < 36; i ++) {
      this.tiles.push(new Tile(i));
      this.dom.append(this.tiles[i].dom);
    }
  }

  place(tileId, card, player) {
    const arr = card.relativeShape.map(x => x + tileId);
    if (arr.every(x => (x >= 0 && x < 36 && this.tiles[x].occupied === ''))) {
      arr.forEach((t) => { this.tiles[t].occupied = player.id; });
      this.update();
      return true;
    } else {
      console.warn('Invalid step');
      return false;
    }
  }

  getRow(i) {
    return [0, 1, 2, 3, 4, 5].map(x => x + i * 6);
  }

  getColumn(i) {
    return [0, 1, 2, 3, 4, 5].map(x => x * 6 + i);
  }

  checkFullStack() {
    const result = [];
    for (let i = 0; i < 6; i ++) {
      const r = this.getRow(i);
      const c = this.getColumn(i);

    }
  }

  clearBoard() {
    this.tiles.forEach(t => {t.occupied = '';});
    this.update();
  }

  update() {
    this.tiles.forEach((t) => t.render());
  }
}

class Card {
  constructor({shape}) {
    this.shape = shape;
  }

  get relativeShape() {
    const temp = this.shape.split('-').map(x => parseInt(x));
    return temp.map(x => x - temp[0]).map(x => (parseInt(x / 4) * 6 + (x % 4)));
  }

  render() {
    const card = document.createElement('div');
    card.className = "cardDisplay";
    const icon = document.createElement('canvas');
    icon.width = 80;
    icon.height = 80;
    const ctx = icon.getContext("2d");
    ctx.fillStyle = "#79697e";
    this.shape.split('-').forEach(x => {
      const width = icon.width / 4;
      const height = icon.height / 4;
      ctx.fillRect((x % 4)* width, parseInt(x / 4) * height, width, height);
    });
    card.append(icon);
    return card;
  }
}

const CardsPool = [
  { shape: '8-0-4-9' },
  { shape: '5-0-4-9' },
  { shape: '4-0-8-12' },
  { shape: '1-0-5' },
];


const myId = 0;
$(document).ready(function() {
  const board = new Board();
  const p1 = new Player({name: 'me', id: 0});
  const p2 = new Player({name: 'them', id: 1});
  const cardsPool = CardsPool.map(x => new Card(x));

  let currentPlayer = p1;
  let selectedCard = null;

  cardsPool.forEach(x => {
    const display = x.render();
    display.onclick = function() {
      if($(this).is('.active')) {
        selectedCard = null;
        $(this).removeClass('active');
      } else {
        selectedCard = x;
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
      }
    }
    $("#cardsPool").append(display);
  });

  $("#board .tile").on('click',function(e) {
    if(selectedCard === null) return;
    if(board.place(e.target.tileId, selectedCard, currentPlayer)) currentPlayer = currentPlayer === p1 ? p2 : p1;
  });

  $("#clear_board").on('click',function() {
    board.clearBoard();
  });
});
