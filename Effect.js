class Effect {
  constructor({name, trigger, pivot}){
    this.name = name;
    this.trigger = trigger;
    this.dispatch = null;
    this.pivotIdx = pivot;
    this.card = null;
  }

  applyToCard(card) {
    this.card = card;
  }

  createEffect() {
    if (
      this.trigger === 'onclear' ||
      this.trigger === 'exist'
    ) {
      this.card.pivotIdx = this.card.shape.split('-').map(x => parseInt(x)).indexOf(this.pivotIdx);
    }
  }
}

class DamageOtherPlayer extends Effect {
  constructor({damage, ...rest}){
    super(rest);
    this.damage = damage;
  }

  createEffect(game) {
    super.createEffect();
      this.dispatch = ({player}) => Promise.resolve(game.applyDamageToOther(player, this.damage));
  }
}

class TransformTile extends Effect {
  constructor({target, method, quantity, ...rest}){
    super(rest);
    this.target = target;
    this.choosedTiles = [];
    this.method = method;
    this.quantity = quantity;
  }

  playerChooseTile(targetTile) {
    return new Promise((resolve, reject) => {
      $("#backdrop").show();
      targetTile.forEach((t) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        document.body.append(indicator);
        const {top, left, width, height} = t.dom.getBoundingClientRect();
        $(indicator).css({ top, left, width, height });
        indicator.onclick = () => {
          $(indicator).addClass('choosed');
          if(!this.choosedTiles.includes(t)) this.choosedTiles.push(t);
          if(this.choosedTiles.length === this.quantity || this.choosedTiles.length === targetTile.length) {
            $(".indicator").remove();
            $("#backdrop").hide();
            resolve(true);
          }
        }
      });
    });
  }

  createEffect(game) {
    super.createEffect();
    const directionArray = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];

    this.dispatch = async({player, tileId, card, board, tiles}) => {
      this.choosedTiles = [];

      const placedTiles = this.trigger === 'onplace'
        ? card.relativeShape.map(x => x.add(new Vector(tileId)))
        : tiles.map(t => t.coord);
      const adjacentTiles = placedTiles.reduce((acc, curr) => {
        const adj = directionArray.map(x => (new Vector(x)).add(curr));
        adj.forEach((item, i) => {
          const t = board.getTile(item);
          if(!acc.includes(t)) acc.push(t);
        });
        return acc;
      }, []).filter(x => x);

      const targetTile = this.target === 'adjacent'
        ? adjacentTiles.filter(t => t.occupied === game.getOppositePlayer(player).id)
        : board.tiles.filter(t => (!adjacentTiles.includes(t) && t.occupied === game.getOppositePlayer(player).id));

      if(targetTile.length) {
        return new Promise(async (resolve, reject) => {
          if(this.method === 'playerChoose') await this.playerChooseTile(targetTile);
          else if (this.method === 'random') {
            while (targetTile.length && this.choosedTiles.length < this.quantity) {
              const idx = parseInt(randomIndex(targetTile));
              this.choosedTiles.push(targetTile.splice(idx, 1)[0]);
            }
          } else if (this.method === 'all') {
            this.choosedTiles = [...targetTile];
          }
          this.choosedTiles.forEach((t, i) => {
            game.transformTile(t, board);
          });
          resolve(true);
        });
      } else return Promise.resolve(true);
    }
  }
}

class Regenerate extends Effect {
  constructor({hp, ...rest}) {
    super(rest);
    this.hp = hp;
  }

  createEffect(game) {
    super.createEffect();
    this.dispatch = ({player, n}) => Promise.resolve(game.regenerate(player, (typeof this.hp === 'function' ? this.hp(n) : this.hp)));
  }
}

class Enhance extends Effect {
  constructor({enhaceTarget, enhance, createSideEffect, constrain, ...rest}) {
    super(rest);
    this.enhaceTarget = enhaceTarget;
    this.enhance = enhance;
    this.createSideEffect = createSideEffect;
    this.constrain = constrain;
  }

  appendToGame(tile, game) {
    const effectIdx = game.addExistEffect(this);
    this.tile = tile;
    const clearEffect = () => {
      game.clearEffect(effectIdx);
    };
    tile.clearEffect = clearEffect;
    if (this.createSideEffect) {
      this.sideEffect = this.createSideEffect({game, tile});
    }
  }

  createEffect(game) {
    super.createEffect();
    this.dispatch = () => {};
  }
}

class DrawCard extends Effect {
  constructor({n, ...rest}) {
    super(rest);
    this.n = n;
  }

  createEffect(game) {
    super.createEffect();
    this.dispatch = ({player}) => Promise.resolve(player.draw(this.n));
  }
}
