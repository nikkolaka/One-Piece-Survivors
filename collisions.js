class Collisions {
    constructor() {
        this.collisions = [];
    }
}

// checks if a circle collides with a rectangle
const checkCircleTouching = function(player, enemy) {
    var dx = player.x - enemy.x;
    var dy = player.y - enemy.y;
    var radiusSum = player.radius + enemy.radius

    return((dx * dx + dy * dy) < (radiusSum)*(radiusSum))
}

const CheckRectCircleColliding = function (circle, rect) {
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.width/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}

//Checks if a circle is colliding with another circle
const enemyCollision = function(thisEntity, otherEntity) {
    var dx = thisEntity.x - otherEntity.x;
    var dy = thisEntity.y - otherEntity.y;
    var COLLISIONREBOUND = 5;
    var radiusSum = thisEntity.radius+otherEntity.radius

    //if the distance is less than the radius, then there's no collision
    if((dx * dx + dy * dy) < (radiusSum)*(radiusSum)) {
        var distance = Math.sqrt(dx * dx + dy * dy);
        var step = radiusSum - distance;
        
        dx /= distance;
        dy /= distance;
        thisEntity.x += dx*step/COLLISIONREBOUND;
        thisEntity.y += dy*step/COLLISIONREBOUND;
    }
}

// this is the collision function for the map boundaries
const CheckBorder = function(hero) {

    // if the player is within the boundaries, then there's no collision
    if (hero.x < 0 + hero.radius) {
        hero.x = 0 + hero.radius;
    }
    if (hero.x > 9500 - hero.radius) {
        hero.x = 9500 - hero.radius;
    }

    // if the player is within the boundaries, then there's no collision
    if (hero.y < 0 + hero.radius) {
        hero.y = 0 + hero.radius;
    }
    if (hero.y > 9500 - hero.radius) {
        hero.y = 9500 - hero.radius;
    }
}

const knockback = function(weapon, enemy) {
    enemy.invincible = true;
    if(weapon.direction == Direction.Up) enemy.y -= weapon.knockback;
    else if(weapon.direction == Direction.Down) enemy.y += weapon.knockback;
    else if(weapon.direction == Direction.Left) enemy.x -= weapon.knockback;
    else if(weapon.direction == Direction.Right) enemy.x += weapon.knockback;
    setTimeout(() => {
        enemy.invincible = false;
    }, 750)
}

const checkFenceCollision = function(player) {
    for (let i = 0; i < this.collisions.length; i++) {
        const fence = this.collisions[i];
        if (CheckRectCircleColliding(player, fence)) {
            // Handle collision with fence here
            // For example, stop the player's movement or apply knockback
            console.log("Player collided with fence");
        }
    }
}

// const fenceCollision = function(player, fence) {
//     if (CheckRectCircleColliding(player, fence)) {
//         // Handle collision with fence here
//         // For example, stop the player's movement or apply knockback
//         console.log("Player collided with fence");
//     }
// }