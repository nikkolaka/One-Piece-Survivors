class Wave{
    constructor(game){
        
        this.game = game
        this.minDifficulty = 1;
        this.maxDifficulty = 10;
        this.currentWave = 0;
        this.spawnDensity = 5;
        this.enemyId = 0;

        this.screenWidth = 1024;
        this.screenHeight = 768;



    };

    spawn(){
        this.currentWave++;
        var playerX = game.playerLocation.x;
        var playerY = game.playerLocation.y;
        for(i = 0; i < this.spawnDensity*4; i += (this.spawnDensity)/this.screenWidth){
            var enemy = new Enemy(this.game, enemyId++);

            if(i > this.spawnDensity*3) {
                //bottom
                enemy.x = i % this.spawnDensity; 
                enemy.y = this.screenHeight + 15;
            } else if(i > this.spawnDensity*2){
                //top
                enemy.x = i % this.spawnDensity; 
                enemy.y = -15;
            } else if(i > this.spawnDensity){
                //left
                enemy.x = -15;
                enemy.y = i % this.spawnDensity;
            } else if(i >= 0){
                //right
                enemy.x = this.screenWidth + 15;
                enemy.y = i % this.spawnDensity;
            }

            this.game.addEnemy(enemy);
        }
    }








}