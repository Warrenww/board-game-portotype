const myId = 0;

$(document).ready(function() {
  const game = new Game();
  const board = new Board(game);

  game.players.forEach(x => {
    const display = x.render();
    $("#info").append(display);
  });

  $("#board .tile").on('click',function(e) {
    if(game.selectedCard === null) return;
    if(board.place(e.target.tileId, game.selectedCard, game.currentPlayer)) game.switchPlayer();
  });
  $("#board .tile").hover(
    function(e) {
      if(game.selectedCard === null) return;
      board.highlight(e.target.tileId, game.selectedCard);
    },
    function (e) {
      if(game.selectedCard === null) return;
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
