class Collisions {
    constructor() {
        this.collisions = [];
    }
}

const CheckRectCircleColliding = function RectCircleColliding(circle,rect) {
    var distX = Math.abs(circle.x - rect.x - rect.width / 2);
    var distY = Math.abs(circle.y - rect.y - rect.height / 2);

    if (distX > (rect.width / 2 + circle.radius)) { return false; }
    if (distY > (rect.height / 2 + circle.radius)) { return false; }

    if (distX <= (rect.width / 2)) { return true; }
    if (distY <= (rect.height / 2)) { return true; }

    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}


const checkCircleColliding = function(thisEntity, otherEntity){
    var dx = thisEntity.x - otherEntity.x;
    var dy = thisEntity.y - otherEntity.y;
    var COLLISIONREBOUND = 5;
    var radiusSum = thisEntity.radius+otherEntity.radius

    //if the distance is less than the radius, then there's no collision
    if((dx * dx + dy * dy) < (radiusSum)*(radiusSum)){
        var distance = Math.sqrt(dx * dx + dy * dy);
        var step = radiusSum - distance;
        
        dx /= distance;
        dy /= distance;
        thisEntity.x += dx*step/COLLISIONREBOUND;
        thisEntity.y += dy*step/COLLISIONREBOUND;
    }

}

// this is the collision function for the map boundaries
const borderCollide = function(hero) {
    var dx = hero.x;
    var dy = hero.y;
    var COLLISIONREBOUND = 5;

    // if the player is within the boundaries, then there's no collision
    if (hero.x < 500) {
        hero.x = 500 - hero.radius;
    }
    if (hero.x > 4800 - hero.radius) {
        hero.x = 4800 - hero.radius;
    }

    // if the player is within the boundaries, then there's no collision
    if (hero.y < 350) {
        hero.y = 350;
    }
    if (hero.y > 4800 - hero.radius) {
        hero.y = 4800 - hero.radius;
    }


}