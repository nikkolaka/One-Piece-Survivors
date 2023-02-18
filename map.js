function isColliding(x, y) {
    return x > this.location.x && x < this.location.x + this.width && y > this.location.y && y < this.location.y + this.height;
  }

function draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
  }