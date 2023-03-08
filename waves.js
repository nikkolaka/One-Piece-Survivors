class Wave{
    constructor(game){
        
        this.game = game
        this.minDifficulty = 1;
        this.maxDifficulty = 10;
        this.currentWave = 0;
        this.spawnDensity = 50;
        




    };


    update(){
        let oldWaveCount = 0;
        this.game.enemies.forEach(enemy => {
            if(enemy.wave == this.currentWave){
                oldWaveCount++;
            }
        });
        if(oldWaveCount < 20){
            this.currentWave++;
            this.spawnDensity += 5;
            this.game.wave++;
            switch(randomInt(2)){
                case 0: 
                    this.spawnRand();
                    break;
                case 1:
                    this.spawnSquare();
                    break;
            }
        }
    }

    spawnSquare(){
        this.currentWave++;
        
        
        var playerX = this.game.player.x - params.screenWidth/2;
        var playerY = this.game.player.y - params.screenHeight/2;
        var  buffer = 0;
        var enemy;

        var side = "left";
        for(var i = 0; i < this.spawnDensity; i++){
            switch(randomInt(4)){
                case 0:
                    enemy = new Blackbeard(this.game, this.game.uniqueEId++);
                    break;
                case 1:
                    enemy = new Doflamingo(this.game, this.game.uniqueEId++);
                    break;
                case 2:
                    enemy = new Navy(this.game, this.game.uniqueEId++);
                    break;
                case 3:
                    enemy = new Akainu(this.game, this.game.uniqueEId++);
                    break;
            } 
            enemy.wave = this.currentWave;

            if(i > (this.spawnDensity/4)*3) {
                //bottom
                enemy.x = (i*(params.screenWidth / (this.spawnDensity/4)) % params.screenWidth) + playerX ; 
                enemy.y = (params.screenHeight + buffer) +playerY;
            } else if(i > (this.spawnDensity/4)*2){
                //top
                enemy.x = (i*(params.screenWidth / (this.spawnDensity/4)) % params.screenWidth) + playerX; 
                enemy.y = (-1*buffer) +playerY;
            } else if(i > (this.spawnDensity/4)){
                //left
                enemy.x = (-1 * buffer) + playerX;
                enemy.y = (i*(params.screenHeight / (this.spawnDensity/4)) % params.screenHeight) + playerY;
            } else if(i >= 0){
                //right
                enemy.x = (params.screenWidth + buffer) + playerX;
                enemy.y = (i*(params.screenHeight / (this.spawnDensity/4)) % params.screenHeight) + playerY;
            }

            this.game.addEnemy(enemy);
        }
    }

    spawnRand(){
        this.currentWave++;
        var playerX = this.game.player.x;
        var playerY = this.game.player.y;
        

        var  buffer = 150;
        for(var i = 0; i < this.spawnDensity; i++){
            var enemy;
            var quadrant = randomInt(4);
            switch(randomInt(4)){
                case 0:
                    enemy = new Blackbeard(this.game, this.game.uniqueEId++);
                    break;
                case 1:
                    enemy = new Doflamingo(this.game, this.game.uniqueEId++);
                    break;
                case 2:
                    enemy = new Navy(this.game, this.game.uniqueEId++);
                    break;
                case 3:
                    enemy = new Akainu(this.game, this.game.uniqueEId++);
                    break;
            }          
            enemy.wave = this.currentWave;
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
