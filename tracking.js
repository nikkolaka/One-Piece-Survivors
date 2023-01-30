const enemyTracking = function enemyTracking(thisEntity, game){
    var playerX = game.playerLocation.x;
    var playerY = game.playerLocation.y;
    
    var dx = thisEntity.x - playerX;
    var dy = thisEntity.y - playerY;

    

    var distance = Math.sqrt(dx * dx + dy * dy);
    var step = thisEntity.speed/1000;
    
    dx /= distance;
    dy /= distance;
    thisEntity.x -= dx*step*game.clockTick;
    thisEntity.y -= dy*step*game.clockTick;

}