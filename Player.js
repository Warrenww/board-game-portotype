class Player {
  constructor({name, id,}) {
    this.id = id;
    this.name = name;
    this.hp = 30;
    this.infoDiv = document.createElement('div');
    this.cardsPool = [];
    this.drawCards = [];
    this.skipTimes = 0;

    this.infoDiv.className = 'player-info' + (this.id === myId ? ' player' : '');
  }

  applyDamage(damage) {
    this.hp -= damage;
    return this;
  }

  draw(n = 1){
    while (n-- > 0 && this.cardsPool.length > 0) {
      this.drawCards.push(this.cardsPool.pop());
    }
    return true;
  }

  update() {
    $(this.infoDiv).find('.hp').text(`hp: ${this.hp}`);
    $(this.infoDiv).find('.draw').text(`draw: ${this.drawCards.length}`);
    $(this.infoDiv).find('.cardsPool').text(`cardsPool: ${this.cardsPool.length}`);
  }

  render() {
    const nameDiv = document.createElement('div');
    nameDiv.innerText = `name: ${this.name}`;

    const hpDiv = document.createElement('div');
    hpDiv.className = 'hp';
    hpDiv.innerText = `hp: ${this.hp}`;

    const drawDiv = document.createElement('div');
    drawDiv.className = 'draw';
    drawDiv.innerText = `draw: ${this.drawCards.length}`;

    const cardsPoolDiv = document.createElement('div');
    cardsPoolDiv.className = 'cardsPool';
    cardsPoolDiv.innerText = `cardsPool: ${this.cardsPool.length}`;

    this.infoDiv.append(nameDiv);
    this.infoDiv.append(hpDiv);
    this.infoDiv.append(drawDiv);
    this.infoDiv.append(cardsPoolDiv);
    return this.infoDiv;
  }
}
