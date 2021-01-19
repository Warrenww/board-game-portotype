class Card {
  constructor({shape}) {
    this.shape = shape;
  }

  get relativeShape() {
    const temp = this.shape.split('-').map(x => parseInt(x));
    return temp.map(x => x - temp[0]).map(x => (parseInt(x / 4) * 6 + (x % 4)));
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
      const width = icon.width / 4;
      const height = icon.height / 4;
      ctx.fillRect((x % 4)* width, parseInt(x / 4) * height, width, height);
    });
    card.append(icon);
    return card;
  }
}
