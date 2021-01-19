class Effect {
  constructor({name, trigger}){
    this.name = name;
    this.trigger = trigger;
    this.dispatch = null;
  }
}

class DamageOtherPlayer extends Effect {
  constructor({damage, ...rest}){
    super(rest);
    this.damage = damage;
  }

  createEffect(game) {
      super.dispatch = ({player}) => game.applyDamageToOther(player, this.damage);
  }
}

class TransformTile extends Effect {
  constructor({target, ...rest}){
    super(rest);
    this.target = target;
  }

  createEffect(game) {
    const directionArray = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];

    super.dispatch = ({player, tileId, card, board}) => {
      const placedTiles = card.relativeShape.map(x => x.add(new Vector(tileId)));
      const adjacentTiles = placedTiles.reduce((acc, curr) => {
        const adj = directionArray.map(x => (new Vector(x)).add(curr));
        adj.forEach((item, i) => {
          const t = board.getTile(item);
          if(!acc.includes(t)) acc.push(t);
        });
        return acc;
      }, []);

      const targetTile = this.target === 'adjacent'
        ? adjacentTiles.filter(t => t.occupied === game.getOppositePlayer(player).id)
        : board.tiles.filter(t => (!adjacentTiles.includes(t) && t.occupied === game.getOppositePlayer(player).id));

      console.log(targetTile)
    }
  }
}