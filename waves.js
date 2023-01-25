class Wave{
    constructor(game){
        
        this.game = game
        this.minDifficulty = 1;
        this.maxDifficulty = 10;
        this.currentWave = 0;
        this.spawnDensity = 100;
        




    };

    spawnSquare(){
        this.currentWave++;
        var playerX = this.game.playerLocation.x;
        var playerY = this.game.playerLocation.y;
        var  buffer = 30;
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
        setInterval(() =>{
            const radius = 30;
            let x;
            let y;
            if(Math.random() < 0.5){
                x = Math.random() < 0.5 ? 0 - radius : params.screenWidth + radius;
                y = Math.random() * params.screenHeight;
            } else{
                x = Math.random() * params.screenWidth;
                y = Math.random() < 0.5? 0 - radius : params.screenHeight + radius;
            }
            const angle = Math.atan2(this.game.playerLocation.x / 2 - y, this.game.playerLocation.y / 2  - x);
            const velocity ={
                x: Math.cos(angle),
                y: Math.sin(angle)
            };
            const enemy = new Enemy(this.game, this.game.uniqueEId++, x, y, velocity);
        this.game.addEnemy(enemy);
        },1000);
    }








}