export default class Crad {
  constructor({group, shape}) {
    this.group = group;
    this.shape = shape;
  }

  static createImg(card, dom, imgSize = 100) {
    const shape = card.shape;
    if (Number.isInteger(Math.sqrt(shape.length))) {
      const size = Math.sqrt(shape.length);
      const canvas = dom || document.createElement('canvas');
      canvas.width = imgSize;
      canvas.height = imgSize;
      const ctx = canvas.getContext('2d');
      shape.split('').forEach((x,i) => {
        const width = canvas.width / size;
        const height = canvas.height / size;
        ctx.fillStyle = "#79697e";
        if (Number(x)) ctx.fillRect((i % size)* width + 1, parseInt(i / size) * height + 1, width - 2, height - 2);
      });
      return canvas;
    } else {
        throw new Error('Invalid shape');
    }
  }
}
