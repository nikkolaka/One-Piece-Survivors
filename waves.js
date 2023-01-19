class Wave{
    constructor(game){
        
        this.game = game
        this.minDifficulty = 1;
        this.maxDifficulty = 10;
        this.currentWave = 0;
        this.spawnDensity = 30;
        

        this.screenWidth = 1024;
        this.screenHeight = 768;



    };

    spawn(){
        this.currentWave++;
        var playerX = this.game.playerLocation.x;
        var playerY = this.game.playerLocation.y;
        var  buffer = -100;
        for(var i = 0; i < this.spawnDensity*4; i++){
            var enemy = new Enemy(this.game, this.game.uniqueEId++);

            if(i > this.spawnDensity*3) {
                //bottom
                enemy.x = i*(this.screenWidth / this.spawnDensity) % this.screenWidth; 
                enemy.y = this.screenHeight + buffer;
            } else if(i > this.spawnDensity*2){
                //top
                enemy.x = i*(this.screenWidth / this.spawnDensity) % this.screenWidth; 
                enemy.y = -1*buffer;
            } else if(i > this.spawnDensity){
                //left
                enemy.x = -1 * buffer;
                enemy.y = i*(this.screenHeight / this.spawnDensity) % this.screenHeight;
            } else if(i >= 0){
                //right
                enemy.x = this.screenWidth + buffer;
                enemy.y = i*(this.screenHeight / this.spawnDensity) % this.screenHeight;
            }

            this.game.addEnemy(enemy);
        }
    }








}