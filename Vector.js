class Vector {
  constructor(n, size = 6){
    this.size = size;
    if(typeof n === 'number') {
      this.x = n % this.size;
      this.y = parseInt(n / this.size);
    } else {
      const v = Array.from(n);
      this.x = v.x || v[0];
      this.y = v.y || v[1];
    }
  }

  static applyData(v, data) {
    v.data = data;
      return v;
  }

  normalize(){
    while(this.x <= -this.size) {
      this.y -= 1;
      this.x += this.size;
    }
    while(this.x >= this.size) {
      this.y += 1;
      this.x -= this.size;
    }
    return this;
  }

  add(v) {
    const vec = new Vector([this.x + v.x, this.y + v.y]);
    const data = {...(this.data || {}), ...(v.data || {})};
    Vector.applyData(vec, data);
    return vec;
  }

  sub(v) {
    const vec = new Vector([this.x - v.x, this.y - v.y]);
    const data = {...(this.data || {}), ...(v.data || {})};
    Vector.applyData(vec, data);
    return vec;
  }

  equal(v) {
    return (this.x === v.x && this.y === v.y);
  }

  get tileId() {
    return this.y * 6 + this.x;
  }
}
