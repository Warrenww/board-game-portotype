class Card {
  constructor({shape, effect}) {
    this.shape = shape;
    this.effect = effect;
  }

  initEffect(game) {
    this.effect?.createEffect(game);
  }

  get relativeShape() {
    const temp = this.shape.split('-').map(x => new Vector(parseInt(x), 5));
    return temp.map(x => x.sub(temp[0]));
  }

  render() {
    const card = document.createElement('div');
    card.className = "cardDisplay";
    const icon = document.createElement('canvas');
    icon.width = 80;
    icon.height = 80;
    const ctx = icon.getContext("2d");
    ctx.fillStyle = "#79697e";
    this.shape.split('-').forEach(x => {
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
