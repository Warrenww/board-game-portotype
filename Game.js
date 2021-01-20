class Game {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.cardsPool = [];
    this.selectedCard = null;
    this.existEffects = [];

    this.players[0] = new Player({
      id: 0,
      // name: prompt('Player 1:')
      name: 'player 1',
    });
    this.players[1] = new Player({
      id: 1,
      // name: prompt('Player 2:')
      name: 'player 2',
    });
    this.playersInitCardsPool();
  }

  async playersInitCardsPool() {
    this.players[0].cardsPool = shuffle(await this.playerChooseCards(this.players[0].name));
    this.players[1].cardsPool = shuffle(await this.playerChooseCards(this.players[1].name));
    this.players.forEach((p) => { p.drawCards = randomChoose(p.cardsPool, 5) });
    this.update();
  }

  playerChooseCards(name) {
    return new Promise((resolve, reject) => {
      $("#cardsPool").css('display', 'flex');
      $("#cardsPool").empty();
      $("#cardsPool").append(`<h3 style='width:100%'>${name}</h3>`);

      const maxQuantity = 30;
      const pools = [];
      const total = CardsPool_1
        .concat(CardsPool_2)
        .concat(CardsPool_1)
        .concat(CardsPool_2)
        .map(x => {
          const card = new Card(x);
          card.initEffect(this);
          return card;
        });

      total.forEach((card, i) => {
        const display = card.render();
        const game = this;

        display.onclick = function() {
          if($(this).is('.active')) {
            // game.selectedCard = null;
            $(this).removeClass('active');
            pools.splice(pools.indexOf(card), 1);
          } else if(pools.length < maxQuantity){
            // game.selectedCard = card;
            $(this).addClass('active');
            // $(this).siblings().removeClass('active');
            pools.push(card);
          }
        }
        $("#cardsPool").append(display);
        // this.cardsPool.push(card);
      });
      const confirmChoose = document.createElement('button');
      confirmChoose.onclick = () => {
        $("#cardsPool").css('display', 'none');
        resolve(pools);
      }
      confirmChoose.innerText = 'Confirm';

      const randomChooseButton = document.createElement('button');
      randomChooseButton.onclick = () => {
        $("#cardsPool").css('display', 'none');
        resolve(randomChoose(total, 30));
      }
      randomChooseButton.innerText = 'Random';


      $("#cardsPool").append(confirmChoose);
      $("#cardsPool").append(randomChooseButton);
    });
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getPlayerById(id) { return this.players.find(p => p.id === id); }

  switchPlayer() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    currentPlayer.drawCards.splice(currentPlayer.drawCards.indexOf(this.selectedCard), 1);
    while (currentPlayer.draw.length > 5) {
      currentPlayer.draw.splice(randomIndex(currentPlayer.draw), 1);
    }

    this.currentPlayerIndex = Number(!this.currentPlayerIndex);
    this.selectedCard = null;
    this.update();
  }

  getOppositePlayer(player) { return this.players.find(x => x !== player); }

  applyDamageToOther(player, damage) {
    const other = this.getOppositePlayer(player);
    other.applyDamage(damage)
    this.update();
  }

  transformTile(tile, board) {
    const currentPlayer = this.getPlayerById(tile.occupied);
    if (currentPlayer) {
      tile.occupied = this.getOppositePlayer(currentPlayer).id;
      board.update();
    }
  }

  regenerate(player, hp){
    const enhance = this.existEffects.filter(x => (x && x.enhaceTarget === 'regenerate'));
    player.hp += enhance.reduce((acc, curr) => {
      if(curr.sideEffect) curr.sideEffect(this.getPlayerById(curr.tile.occupied));
      return (player === this.getPlayerById(curr.tile.occupied) ? curr.enhance(acc) : acc);
    }, hp);
    this.update();
    return true;
  }

  addExistEffect(effect) {
    this.existEffects.push(effect);
    return this.existEffects.length - 1;
  }

  clearEffect(idx) {
    this.existEffects[idx] = null;
    return true;
  }

  checkEndGame() {
    const dead = this.players.find(x => x.hp <= 0);
    if (dead) {
      alert(`${dead.name} is dead.`);
    }
  }

  reset() {
    this.players.forEach(x => x.hp = 30);
    this.currentPlayerIndex = 0;
    this.update();
  }

  update() {
    const result = this.checkEndGame();
    const tmp = this.players[this.currentPlayerIndex].infoDiv;
    $(tmp).addClass('active');
    $(tmp).siblings().removeClass('active');

    const cards = this.players[this.currentPlayerIndex].drawCards;
    $("#sidebar").empty();
    cards.forEach((card, i) => {
      // const card = new Card(c);
      const display = card.render();
      const game = this;

      display.onclick = function() {
        if($(this).is('.active')) {
          game.selectedCard = null;
          $(this).removeClass('active');
        } else {
          game.selectedCard = card;
          $(this).addClass('active');
          $(this).siblings().removeClass('active');
        }
      }
      $("#sidebar").append(display);
    });

    this.players.forEach(x => x.update());
  }
}
