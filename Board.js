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
      $(this.dom).attr('effectTrigger', this.effect?.trigger || '');
    }
    else {
      $(this.dom).attr('occupied', null);
      $(this.dom).attr('effectTrigger', null);
    }

    if(['exist', 'onclear'].includes(this.effect?.trigger)) {
      $(this.dom).attr('title', this.effect.name);
    } else {
      $(this.dom).attr('title', null);
    }
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

    this.skipBtn = document.createElement('button');
    document.body.appendChild(this.skipBtn);
    this.skipBtn.id = 'skip';
    this.skipBtn.innerText = 'Skip';
    this.skipBtn.onclick = () => this.skip();
  }

  skip() {
    this.game.selectedCard = null;
    const clear = this.game.skip();
    console.log(clear);
    if (clear) this.clearBoard();
    this.update();
  }

  getTile({x, y}) { return this.tiles.find(t => t.coord.equal(new Vector([x, y]))); }

  validateTile({x, y}){
    const exist = this.getTile({x, y});
    if(exist && exist.occupied === '') return true;
    return false;
  }

  async place(tileId, card, player) {
    const arr = card.relativeShape.map(x => x.add(new Vector(tileId)));
    if (arr.every(x => this.validateTile(x))) {
      const enhance = this.game.existEffects
        .filter(x => x?.enhaceTarget === 'onplace')
        .filter(x => this.game.getPlayerById(x.tile.occupied) === player)
        .filter(x => x.constrain(card));
      enhance.forEach((item, i) => {
        item.sideEffect({
          player:this.game.getPlayerById(item.tile.occupied),
        });
      });

      arr.forEach((t) => {
        this.tiles[t.tileId].occupied = player.id;
        if (t.data?.effect) {
          this.tiles[t.tileId].effect = t.data.effect;
        }
      });
      this.update();
      if(card.effect?.trigger === 'exist') {
        card.effect.appendToGame(this.getTile(arr[card.pivotIdx]), this.game);
      }
      this.game.skippedPlayer = null;
      if(card.effect?.trigger === 'onplace') {
        await card.effect.dispatch({player, tileId, card, board: this});
      }
      this.updateMovement(player, card);
      player.draw();
      return Promise.resolve(true);
    } else {
      return Promise.reject('Invalid step');
    }
  }

  highlight(tileId, card) {
    const arr = card.relativeShape.map(x => x.add(new Vector(tileId)));
    const availible = arr.filter(x => this.validateTile(x));
    availible.forEach((t) => {
      $(this.tiles[t.tileId].dom).addClass('highlight');
      if (availible.length !== arr.length) {
        $(this.tiles[t.tileId].dom).attr('invalid', 'true');
      } else {
        $(this.tiles[t.tileId].dom).attr('invalid', null);
      }
    });
  }

  deHighlight() {
    this.tiles.forEach((t) => {
      $(t.dom).removeClass('highlight');
      $(this.dom).attr('invalid', null);
    });
  }

  getRow(i) { return [0, 1, 2, 3, 4, 5].map(x => this.tiles[x + i * 6]); }

  getColumn(i) { return [0, 1, 2, 3, 4, 5].map(x => this.tiles[x * 6 + i]); }

  checkFullStack() {
    const result = [];
    for (let i = 0; i < 6; i ++) {
      const r = this.getRow(i);
      const c = this.getColumn(i);

      if(r.every(t => (t.occupied !== ''))) result.push(r);
      if(c.every(t => (t.occupied !== ''))) result.push(c);
    }

    return result;
  }

  clearBoard() {
    this.tiles.forEach(t => {
      t.occupied = '';
      t.effect = null;
      t.clearEffect = null;
    });
    this.update();
  }

  async updateMovement(player, card) {
    const check = this.checkFullStack();
    if (check.length) {
      const damage = await check.reduce(async (acc, curr) => {
        const d = await curr.reduce(async (a, t) => {
          if (t.effect?.trigger === 'onclear') {
            console.log(t.effect);
            const result = await t.effect?.dispatch({
              player: this.game.getPlayerById(t.occupied),
              tiles: curr.filter(x => x.effect?.trigger === 'onclear'),
              board: this,
            });
            console.log(result);
            if (result) t.effect = null;
          } else if (t.effect?.trigger === 'exist') {
            t.clearEffect();
            t.effect = null;
          }
          t.render();
          const tmp = await a + (t.occupied === player.id ? 1 : 0);
          t.occupied = '';
          return Promise.resolve(tmp);
        }, 0);
        return Promise.resolve(await acc + d);
      }, 0);
      if (damage) this.game.applyDamageToOther(player, damage);

      if (card.effect?.trigger === 'onfill') {
        card.effect.dispatch({player, n: check.length});
      };
    }
    this.update();
  }

  update() {
    $(this.skipBtn).attr('safe', this.game.skippedPlayer !== null);
    this.tiles.forEach((t) => t.render());
  }
}
