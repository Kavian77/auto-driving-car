class Car {
  static ACCELERATION = 0.5;

  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxSpeed = 10;
    this.acceleration = Car.ACCELERATION;
    this.reverseAcceleration = Car.ACCELERATION / 2;
    this._speed = 0;
    this.friction = 0.1;
    this.breakingFriction = Car.ACCELERATION / 1.5;
    this.controls = new Controls();
    this.angle = Math.PI * 1.5;
  }

  set speed(value) {
    this._speed = Math.min(this.maxSpeed, value);
  }

  get speed() {
    return this._speed;
  }

  shouldFlipWheel() {
    return this.speed < 0;
  }

  updateSpeed() {
    const currentSpeed = this.speed;
    if (this.controls.isBreaking) {
      if (currentSpeed > 0) {
        this.speed = Math.max(0, currentSpeed - (this.breakingFriction + this.friction));
      } else {
        this.speed = Math.min(0, currentSpeed + (this.breakingFriction + this.friction));
      }
    } else if (this.controls.isGoingForward) {
      this.speed += this.acceleration - this.friction;
    } else if (this.controls.isGoingBackward) {
      this.speed -= this.reverseAcceleration - this.friction;
    } else {
      if (currentSpeed > 0) {
        this.speed = Math.max(0, currentSpeed - this.friction);
      } else if (currentSpeed < 0) {
        this.speed = Math.min(0, currentSpeed + this.friction);
      }
    }
  }

  updateAngle() {
    if (!this.controls.isGoingLeft && !this.controls.isGoingRight) {
      return;
    }

    if (this.speed === 0) {
      return;
    }

    const currentAngle = this.angle;

    const dAngle = this.shouldFlipWheel() ? -0.075 : 0.075;
    if (this.controls.isGoingLeft) {
      this.angle = (currentAngle - dAngle) % (Math.PI * 2);
    } else if (this.controls.isGoingRight) {
      this.angle = (currentAngle + dAngle) % (Math.PI * 2);
    }
  }

  updatePosition() {
    const dx =
      Math.cos(this.angle * (this.shouldFlipWheel() ? -1 : 1)) * this.speed;
    const dy = Math.sin(this.angle) * this.speed;
    this.x += dx;
    this.y += dy;
  }

  update() {
    this.updateAngle();
    this.updateSpeed();
    this.updatePosition();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI * 1.5 + this.angle);
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }
}
