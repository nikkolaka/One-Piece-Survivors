function isColliding(x, y) {
    return x > this.location.x1 && x < this.location.x2 && y > this.location.y1 && y < this.location.y2;
}

function draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.location.x1, this.location.y1, this.width, this.height);
}

