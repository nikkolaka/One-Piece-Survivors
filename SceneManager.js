class SceneManager {
    constructor(game) {
        
        this.game = game;
        this.game.camera = this;


        this.x = 0;
        this.y = 0;

   
   
        this.loadAssets();
        
    }

    loadAssets() {
        this.x = 0;
        this.y = 0;

        var waveMaker = new Wave(gameEngine);
        waveMaker.spawnRand();


        this.luffy = new Zoro(gameEngine);
        gameEngine.addPlayer(this.luffy);

        this.Background = new Background(gameEngine);
        gameEngine.addEntity(this.Background);

    }

    update() {
 

        let midpointX = params.screenWidth/2 - 100; //Canvas width - half of luffy width
        let midpointY = params.screenHeight/2 - 90;


        this.x = this.luffy.x - midpointX;
        this.y = this.luffy.y - midpointY;
    }


}