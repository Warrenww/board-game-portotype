const myId = 0;

$(document).ready(function() {
  const game = new Game();
  const board = new Board(game);

  game.players.forEach(x => {
    const display = x.render();
    $("#info").append(display);
  });

  $("#board .tile").on('click',async function(e) {
    if(game.selectedCard === null) return;
    try {
      const validStep = await board.place(e.target.tileId, game.selectedCard, game.currentPlayer);
      if(validStep) game.switchPlayer();
    } catch (e) {
      console.warn(e);
    }
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
