class Road {
  constructor({ x, width, laneCount }) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    // Note that Math.Infinity is not used here because it is not an absolute value.
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return this.left + laneWidth * (laneIndex + 0.5);
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.setLineDash([]);

    // left border
    ctx.beginPath();
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(this.left, this.bottom);
    ctx.stroke();

    // right border
    ctx.beginPath();
    ctx.moveTo(this.right, this.top);
    ctx.lineTo(this.right, this.bottom);
    ctx.stroke();

    // lanes
    if (this.laneCount > 1) {
      const laneWidth = this.width / this.laneCount;
      for (let i = 1; i < this.laneCount; i++) {
        const x = this.left + i * laneWidth;
        ctx.setLineDash([40, 40]);
        ctx.beginPath();
        ctx.moveTo(x, this.top);
        ctx.lineTo(x, this.bottom);
        ctx.stroke();
      }
    }
  }
}
