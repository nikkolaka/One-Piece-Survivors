class Collisions {
  constructor() {
    this.collisions = [];
  }

  add(collision) {
    this.collisions.push(collision);
  }

  remove(collision) {
    this.collisions = this.collisions.filter(c => c !== collision);
  }

  update() {
    this.collisions.forEach(collision => collision.update());
  }
}

class Collision {
  constructor(entity1, entity2) {
    this.entity1 = entity1;
    this.entity2 = entity2;
  }

  update() {
    if (this.entity1.isCollidingWith(this.entity2)) {
      this.entity1.collideWith(this.entity2);
      this.entity2.collideWith(this.entity1);
    }
  }
}

class CircleCollision extends Collision {
  constructor(entity1, entity2) {
    super(entity1, entity2);
  }

  update() {
    if (this.entity1.isCollidingWith(this.entity2)) {
      this.entity1.collideWith(this.entity2);
      this.entity2.collideWith(this.entity1);
    }
  }
}

class RectangleCollision extends Collision {
  constructor(entity1, entity2) {
    super(entity1, entity2);
  }

  update() {
    if (this.entity1.isCollidingWith(this.entity2)) {
      this.entity1.collideWith(this.entity2);
      this.entity2.collideWith(this.entity1);
    }
  }
}