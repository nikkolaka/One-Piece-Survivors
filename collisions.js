class Collisions {
    constructor() {
        this.collisions = [];
    }

    addCollision(collision) {
        this.collisions.push(collision);
    }

    checkCollisions() {
        for (let i = 0; i < this.collisions.length; i++) {
            let collision = this.collisions[i];
            if (collision.checkCollision()) {
                collision.resolveCollision();
            }
        }
    }
}

const checkCircleColliding = function(thisEntity, otherEntity) {
    var dx = thisEntity.x - otherEntity.x;
    var dy = thisEntity.y - otherEntity.y;
    var radiusSum = thisEntity.radius+otherEntity.radius

    if((dx * dx + dy * dy) < (radiusSum)*(radiusSum)) {
        return true;
    }
    return false;
}


    // var dx = thisEntity.x - otherEntity.x;
    // var dy = thisEntity.y - otherEntity.y;
    // var COLLISIONREBOUND = 5;
    // var radiusSum = thisEntity.radius+otherEntity.radius

    // if((dx * dx + dy * dy) < (radiusSum)*(radiusSum)){
    //     var distance = Math.sqrt(dx * dx + dy * dy);
    //     var step = radiusSum - distance;
        
    //     dx /= distance;
    //     dy /= distance;
    //     thisEntity.x += dx*step/COLLISIONREBOUND;
    //     thisEntity.y += dy*step/COLLISIONREBOUND;
    // }

