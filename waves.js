class Wave{
    constructor(game){
        this.game = game
        this.minDifficulty = 1;
        this.maxDifficulty = 10;
        this.currentWave = 0;
        this.spawnDensity = 50;

        this.akainuProb = 0.01;
        this.navyProb = 0.9;
        this.dofyProb = 0.04;
        this.blackProb = 0.04;

        // intialize wave and score
        this.game.wave = 0;
        this.game.score = 0;
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
            this.akainuProb += 0.01;
            this.dofyProb += 0.01;
            this.blackProb += 0.01;
            this.navyProb -= 0.01;
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
        
        
        
        var playerX = this.game.player.x - params.screenWidth/2;
        var playerY = this.game.player.y - params.screenHeight/2;
        var buffer = 0;
        var enemy;

        for(var i = 0; i < this.spawnDensity; i++){
            enemy = this.spawnEnemy();
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
        
        var playerX = this.game.player.x;
        var playerY = this.game.player.y;
        

        var  buffer = 150;
        for(var i = 0; i < this.spawnDensity; i++){
            var enemy;
            var quadrant = randomInt(4);
            enemy = this.spawnEnemy();          
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

    spawnEnemy(){
        var probabilityArray = [];
        for(let i = 0; i < (this.navyProb*1000); i++){
            probabilityArray.push(0);
        }
        for(let i = 0; i < (this.dofyProb*1000); i++){
            probabilityArray.push(1);
        }
        for(let i = 0; i < (this.blackProb*1000); i++){
            probabilityArray.push(2);
        }
        for(let i = 0; i < (this.akainuProb*1000); i++){
            probabilityArray.push(3);
        }
        var idx = Math.floor(Math.random() * probabilityArray.length);

        if(probabilityArray[idx] == 0) return new Navy(this.game, this.game.uniqueEId++);
        else if(probabilityArray[idx] == 1) return new Doflamingo(this.game, this.game.uniqueEId++);
        else if(probabilityArray[idx] == 2) return new Blackbeard(this.game, this.game.uniqueEId++);
        else if(probabilityArray[idx] == 3) return new Akainu(this.game, this.game.uniqueEId++);
    }
}
