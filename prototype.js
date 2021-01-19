const CardsPool = [
  { shape: '8-0-4-9' },
  { shape: '5-0-4-9' },
  { shape: '4-0-8-12' },
  { shape: '1-0-5' },
];


const myId = 0;
$(document).ready(function() {
  const game = new Game();
  const board = new Board(game);
  const cardsPool = CardsPool.map(x => new Card(x));

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

  game.players.forEach(x => {
    const display = x.render();
    $("#info").append(display);
  });

  $("#board .tile").on('click',function(e) {
    if(selectedCard === null) return;
    if(board.place(e.target.tileId, selectedCard, game.currentPlayer)) game.switchPlayer();
  });

  $("#clear_board").on('click', () => board.clearBoard());
  $("#reset").on('click', () => {
    if(confirm('Sure?')) {
      game.reset();
      board.clearBoard();
    }
  });
});
