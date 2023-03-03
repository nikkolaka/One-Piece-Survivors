class Collisions {
    constructor() {
        this.collisions = [];
    }
}


// checks if a circle collides with a rectangle
const checkPlayerTouchingEnemy = function(player, enemy){

    var dx = player.x - enemy.x;
    var dy = player.y - enemy.y;
    var radiusSum = player.radius + enemy.radius

    return((dx * dx + dy * dy) < (radiusSum)*(radiusSum))

}

const CheckRectCircleColliding = function (circle, rect){
    

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
const CheckBorder = function(hero) {

    // if the player is within the boundaries, then there's no collision
    if (hero.x < 0 + hero.radius) {
        hero.x = 0 + hero.radius;
    }
    if (hero.x > 5000 - hero.radius) {
        hero.x = 5000 - hero.radius;
    }

    // if the player is within the boundaries, then there's no collision
    if (hero.y < 0 + hero.radius) {
        hero.y = 0 + hero.radius;
    }
    if (hero.y > 5000 - hero.radius) {
        hero.y = 5000 - hero.radius;
    }


}

const knockback = function(weapon, enemy) {
    

    enemy.canKnockback = false;
    
    setTimeout(() => {
        enemy.canKnockback = true;
        if(weapon.direction == Direction.Up) enemy.y -= 50;
        else if(weapon.direction == Direction.Down) enemy.y += 50;
        else if(weapon.direction == Direction.Left) enemy.x -= 50;
        else if(weapon.direction == Direction.Right) enemy.x += 50;
    
    }, 200)
    

}

 // const checkSqaureColliding = function(thisEntity, otherEntity) {
//     var COLLISIONREBOUND = 5;
//     var dx = thisEntity.x - otherEntity.x;
//     var dy = thisEntity.y - otherEntity.y;
//     var width = (thisEntity.width + otherEntity.width) / 2;
//     var height = (thisEntity.height + otherEntity.height) / 2;
//     var crossWidth = width * dy;
//     var crossHeight = height * dx;
//     var collision = 'none';

//     if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
//         if (crossWidth > crossHeight) {
//             collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
//         } else {
//             collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
//         }
//     }

//     if (collision === 'left') {
//         thisEntity.x += width - dx;
//     } else if (collision === 'right') {
//         thisEntity.x -= width + dx;
//     } else if (collision === 'top') {
//         thisEntity.y += height - dy;
//     } else if (collision === 'bottom') {
//         thisEntity.y -= height + dy;
//     }
// }


