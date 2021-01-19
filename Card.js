class Card {
  constructor({shape}) {
    this.shape = shape;
  }

  get relativeShape() {
    const temp = this.shape.split('-').map(x => parseInt(x));
    const scale = temp.map(x => (parseInt(x / 5) * 6 + (x % 5)));
    return scale.map(x => x - scale[0]);
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
    return card;
  }
}
