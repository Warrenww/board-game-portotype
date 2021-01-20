class Card {
  constructor({group, shape, effect}) {
    this.group = group;
    this.shape = shape;
    this.effect = effect;
  }

  initEffect(game) {
    this.effect?.applyToCard(this);
    this.effect?.createEffect(game);
  }

  get relativeShape() {
    const temp = this.shape.split('-').map(x => new Vector(parseInt(x), 5));
    const vec = temp.map(x => x.sub(temp[0]));
    if(this.effect?.trigger === 'onclear') return vec.map((x, i) => (i === this.pivotIdx ? Vector.applyData(x, {effect: this.effect}) : x));
    return vec;
  }

  render() {
    const card = document.createElement('div');

    const group = document.createElement('h4');
    group.innerText = this.group;
    card.append(group);

    card.className = "cardDisplay";
    const icon = document.createElement('canvas');
    icon.width = 80;
    icon.height = 80;
    const ctx = icon.getContext("2d");
    this.shape.split('-').forEach(x => {
      ctx.fillStyle = this.effect?.pivotIdx === parseInt(x) ? "#fee348" : "#79697e";
      const width = icon.width / 5;
      const height = icon.height / 5;
      ctx.fillRect((x % 5)* width + 1, parseInt(x / 5) * height + 1, width - 2, height - 2);
    });
    card.append(icon);

    const desciption = document.createElement('div');
    desciption.innerText = `Effect: ${this.effect ? this.effect.name : '-'}`;

    card.append(desciption);

    return card;
  }
}
