export default class Crad {
  constructor({group, shape}) {
    // this.validateShape(shape);
    this.group = group;
    this.shape = shape;
    this.size = Math.max(...this.shape.flat()) + 1;
  }

  get relativeShape() {
    const center = this.shape.reduce((a,c) => [a[0] + c[0], a[1] + c[1]], [0, 0]);
    return this.shape.map(([x,y]) => ({x: x - parseInt(center[0] / this.shape.length), y: y - parseInt(center[1] / this.shape.length)}));
  }

  static createImg(card, dom, imgSize = 100) {
    const shape = card.shape;
    const canvas = dom || document.createElement('canvas');
    canvas.width = imgSize;
    canvas.height = imgSize;
    const ctx = canvas.getContext('2d');
    shape.forEach(([x, y]) => {
      const width = canvas.width / card.size;
      const height = canvas.height / card.size;
      ctx.fillStyle = "#79697e";
      ctx.fillRect(x * width + 1, y * height + 1, width - 2, height - 2);
    });
    return canvas;
  }
}
