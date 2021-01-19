class Player{
  constructor({name, id,}) {
    this.id = id;
    this.name = name;
    this.hp = 30;
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
