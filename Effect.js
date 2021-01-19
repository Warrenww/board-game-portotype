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
