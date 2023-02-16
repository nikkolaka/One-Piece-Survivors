class Collisions {
    constructor() {
        this.collisions = [];
    }
}

const CheckRectCircleColliding = function RectCircleColliding(circle,rect) {

    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}

const checkCircleColliding = function(thisEntity, otherEntity) {

    var dx = thisEntity.x - otherEntity.x;
    var dy = thisEntity.y - otherEntity.y;
    var COLLISIONREBOUND = 5;
    var radiusSum = thisEntity.radius+otherEntity.radius

    if((dx * dx + dy * dy) < (radiusSum)*(radiusSum)) {
        var distance = Math.sqrt(dx * dx + dy * dy);
        var step = radiusSum - distance;
        
        dx /= distance;
        dy /= distance;
        thisEntity.x += dx*step/COLLISIONREBOUND;
        thisEntity.y += dy*step/COLLISIONREBOUND;
    }
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
