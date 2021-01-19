const CardsPool = [
  { shape: '5-6-1-10' },
  { shape: '5-6-0-11' },
  { shape: '1-6-0-7' },
  { shape: '1-6-2-5' },
  { shape: '6-5-7-2' },
  { shape: '6-5-7-10' },
  { shape: '6-1-11-10' },
  { shape: '6-1-11-2' },
  { shape: '6-5-7-1' },
  { shape: '6-5-7-11' },
  { shape: '6-1-11-7' },
  { shape: '6-1-11-5' },
  { shape: '1-0-6' },
  { shape: '1-0-5' },
  { shape: '1-0-5-6' },
  { shape: '6-1-2-3-5-8-9-11-12-13' },
  { shape: '11-1-16-6-21-5-7-15-17' },
  { shape: '7-2-3-4-10-11-12' },
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
  $("#board .tile").hover(
    function(e) {
      if(selectedCard === null) return;
      board.highlight(e.target.tileId, selectedCard);
    },
    function (e) {
      if(selectedCard === null) return;
      board.deHighlight();
    }
  );

  $("#clear_board").on('click', () => board.clearBoard());
  $("#reset").on('click', () => {
    if(confirm('Sure?')) {
      game.reset();
      board.clearBoard();
    }
  });
});
