class Wave{
    constructor(game){
        
        this.game = game
        this.minDifficulty = 1;
        this.maxDifficulty = 10;
        this.currentWave = 0;
        this.spawnDensity = 50;
        




    };

    spawnSquare(){
        this.currentWave++;
        var playerX = this.game.playerLocation.x;
        var playerY = this.game.playerLocation.y;
        var  buffer = -100;
        for(var i = 0; i < this.spawnDensity*4; i++){
            var enemy = new Enemy(this.game, this.game.uniqueEId++);

            if(i > this.spawnDensity*3) {
                //bottom
                enemy.x = i*(params.screenWidth / this.spawnDensity) % params.screenWidth; 
                enemy.y = params.screenHeight + buffer;
            } else if(i > this.spawnDensity*2){
                //top
                enemy.x = i*(params.screenWidth / this.spawnDensity) % params.screenWidth; 
                enemy.y = -1*buffer;
            } else if(i > this.spawnDensity){
                //left
                enemy.x = -1 * buffer;
                enemy.y = i*(params.screenHeight / this.spawnDensity) % params.screenHeight;
            } else if(i >= 0){
                //right
                enemy.x = params.screenWidth + buffer;
                enemy.y = i*(params.screenHeight / this.spawnDensity) % params.screenHeight;
            }

            this.game.addEnemy(enemy);
        }
    }
    spawnRand(){
        this.currentWave++;
        var playerX = this.game.playerLocation.x;
        var playerY = this.game.playerLocation.y;
        

        var  buffer = -50;
        for(var i = 0; i < this.spawnDensity*4; i++){
            var enemy = new Enemy(this.game, this.game.uniqueEId++);
            var quadrant = randomInt(4);
            switch(quadrant){
                case 0:
                    //bottom quadrant
                    enemy.x = playerX + randomInt(2*params.screenWidth)-params.screenWidth;
                    enemy.y = playerY + randomInt(params.screenHeight)+(params.screenHeight/2)+buffer;
                    break;
                case 1:
                    //top quadrant
                    enemy.x = playerX + randomInt(2*params.screenWidth)-params.screenWidth;
                    enemy.y = playerY - (params.screenHeight/2) - buffer - randomInt(params.screenHeight);
                    break;
                case 2:
                    //left quadrant
                    enemy.x = playerX - (params.screenWidth/2) - buffer - randomInt(params.screenWidth);
                    enemy.y = playerY + randomInt(2*params.screenHeight)-params.screenHeight;
                    break;
                case 3:
                    //right quadrant
                    enemy.x = playerX + (params.screenWidth/2) + buffer + randomInt(params.screenWidth);
                    enemy.y = playerY + randomInt(2*params.screenHeight)-params.screenHeight;
                    break;

            }
            this.game.addEnemy(enemy);
        }
    }








}
