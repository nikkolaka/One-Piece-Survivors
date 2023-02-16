class Collisions {
    constructor() {
        this.collisions = [];
    }
}

// checks if a circle collides with a rectangle
const CheckRectCircleColliding = function RectCircleColliding(circle, rect){
    
    // calculate distance between the circle's center and this rectangle's center
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);    
    
    // checks if the distance is greater than the dimension of the circle and rectangle
    // returns false if a collision is not detected
    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }
    
    // checks if the distance is less than the dimension of the circle and rectangle
    // returns true if a collision is detected
    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    //checks if a circle collision is detected with a rectangle
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
