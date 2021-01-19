class Tile {
  constructor(id){
    this.id = id;
    this.coord = new Vector(this.id);
    this.occupied = '';
    this.dom = document.createElement('div');

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
  constructor(game){
    this.game = game;
    this.dom = $("#board");
    this.tiles = [];
    this.occupied = [];

    for (let i = 0; i < 36; i ++) {
      this.tiles.push(new Tile(i));
      this.dom.append(this.tiles[i].dom);
    }
  }

  getTile({x, y}) { return this.tiles.find(t => t.coord.equal(new Vector([x, y]))); }

  validateTile({x, y}){
    const exist = this.getTile({x, y});
    if(exist && exist.occupied === '') return true;
    return false;
  }

  place(tileId, card, player) {
    const arr = card.relativeShape.map(x => x.add(new Vector(tileId)));
    if (arr.every(x => this.validateTile(x))) {
      arr.forEach((t) => { this.tiles[t.tileId].occupied = player.id; });
      if(card.effect?.trigger === 'onplace') {
        card.effect.dispatch({player, tileId, card, board: this});
      }
      this.updateMovement(player);
      return true;
    } else {
      console.warn('Invalid step');
      return false;
    }
  }

  highlight(tileId, card) {
    const arr = card.relativeShape.map(x => x.add(new Vector(tileId)));
    arr.filter(x => this.validateTile(x)).forEach((t) => { $(this.tiles[t.tileId].dom).addClass('highlight'); });
  }

  deHighlight() {
    this.tiles.forEach((t) => { $(t.dom).removeClass('highlight'); });
  }

  getRow(i) { return [0, 1, 2, 3, 4, 5].map(x => this.tiles[x + i * 6]); }

  getColumn(i) { return [0, 1, 2, 3, 4, 5].map(x => this.tiles[x * 6 + i]); }

  checkFullStack() {
    const result = [];
    for (let i = 0; i < 6; i ++) {
      const r = this.getRow(i);
      const c = this.getColumn(i);

      if(r.every(t => (t.occupied !== ''))) result.push(r.map(({id, occupied}) => ({tileId: id, playerId: occupied})));
      if(c.every(t => (t.occupied !== ''))) result.push(c.map(({id, occupied}) => ({tileId: id, playerId: occupied})));
    }

    return result;
  }

  clearBoard() {
    this.tiles.forEach(t => {t.occupied = '';});
    this.update();
  }

  updateMovement(player) {
    const check = this.checkFullStack();
    const damage = check.reduce((acc, curr) => {
      const d = curr.reduce((a, t) => {
        this.tiles[t.tileId].occupied = '';
        return a + (t.playerId === player.id ? 1 : 0);
      }, 0);
      return acc + d;
    }, 0);
    if (damage) this.game.applyDamageToOther(player, damage);
    this.update();
  }

  update() {
    this.tiles.forEach((t) => t.render());
  }
}
