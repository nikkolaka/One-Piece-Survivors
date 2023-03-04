const enemyTracking = function enemyTracking(thisEntity, thatEntity, game){
    
    
    
    var dx = thisEntity.x - thatEntity.x;
    var dy = thisEntity.y - thatEntity.y;

    

    var distance = Math.sqrt(dx * dx + dy * dy);
    var step = 0.25*thisEntity.speed;
    
    dx /= distance;
    dy /= distance;
    thisEntity.x -= dx*step*game.clockTick;
    thisEntity.y -= dy*step*game.clockTick;

    
}

const closestEnemy = function closestEnemy(game){
    var enemyList = game.enemies;
    var player = game.player;
    var distance = 100000;
    var index = 0;

    for(var i = 0; i < enemyList.length; i++){
        var dx = enemyList[i].x - player.x;
        var dy = enemyList[i].y - player.y;
        var newDistance = Math.sqrt(dx * dx + dy * dy);
        if(distance > newDistance) {
            distance = newDistance;
            index = i;
        }
            
    }
    if(distance > 500) return null;
    return enemyList[index];


}