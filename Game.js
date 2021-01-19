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

    this.players[0] = new Player({
      id: 0,
      // name: prompt('Player 1:')
      name: 'me',
    });
    this.players[1] = new Player({
      id: 1,
      // name: prompt('Player 2:')
      name: 'them',
    });
    $(this.players[0].infoDiv).addClass('active');
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  switchPlayer() {
    this.currentPlayerIndex = Number(!this.currentPlayerIndex);
    this.update();
  }

  applyDamageToOther(player, damage) {
    const other = this.players.find(x => x !== player);
    other.applyDamage(damage)
    this.update();
  }

  checkEndGame() {
    const dead = this.players.find(x => x.hp <= 0);
    if (dead) {
      alert(`${dead.name} is dead.`);
      this.reset();
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
