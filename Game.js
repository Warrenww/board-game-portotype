class Player {
  constructor({name, id,}) {
    this.id = id;
    this.name = name;
    this.hp = 30;
    this.infoDiv = document.createElement('div');
    this.infoDiv.className = 'player-info' + (this.id === myId ? ' player' : '');
  }

  applyDamage(damage) {
    this.hp -= damage;
    return this;
  }

  update() {
    $(this.infoDiv).find('.hp').text(`hp: ${this.hp}`);
  }

  render() {
    const nameDiv = document.createElement('div');
    nameDiv.innerText = `name: ${this.name}`;
    const hpDiv = document.createElement('div');
    hpDiv.className = 'hp';
    hpDiv.innerText = `hp: ${this.hp}`;

    this.infoDiv.append(nameDiv);
    this.infoDiv.append(hpDiv);
    return this.infoDiv;
  }
}

class Game {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.cardsPool = [];
    this.selectedCard = null;

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
    $(this.players[0].infoDiv).addClass('active');

    CardsPool_1.concat(CardsPool_2).forEach((item, i) => {
      const card = new Card(item);
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
      $("#cardsPool").append(display);

      card.initEffect(this);
      this.cardsPool.push(card);
    });

  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getPlayerById(id) { return this.players.find(p => p.id === id); }

  switchPlayer() {
    this.currentPlayerIndex = Number(!this.currentPlayerIndex);
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
    player.hp += hp;
    this.update();
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
    const tmp = (this.players[this.currentPlayerIndex].infoDiv);
    $(tmp).addClass('active');
    $(tmp).siblings().removeClass('active');
    this.players.forEach(x => x.update());
  }
}
