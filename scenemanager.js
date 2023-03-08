class SceneManager {
    constructor(game) {
        
        this.game = game;
        this.game.camera = this;
        this.game.stage;

        this.x = 0;
        this.y = 0;

        this.gameOver = true;

        this.player = new Brook(gameEngine);
        gameEngine.addPlayer(this.player);

        this.Background = new Background(gameEngine);

        this.waveMaker = new Wave(gameEngine);
    }

    clearEntities() {
        this.game.entities.forEach(entity => {
            entity.removeFromWorld = true;
        });
    }

    loadTitleScreen() {
        this.game.stage = "title";
        this.clearEntities();
        gameEngine.addEntity(new StartScreen(gameEngine));
        
        //this.player = new Luffy(gameEngine);
        //gameEngine.addPlayer(this.player);

        this.Background = new Background(gameEngine);
        //gameEngine.addEntity(this.Background); 
        //this.waveMaker = new Wave(gameEngine);
        //this.shop = new Shop(gameEngine);
    }

    loadAssets() {
        this.clearEntities();
        this.game.camera = this;
        this.gameOver = false;

        this.x = 0;
        this.y = 0;

        this.game.stage  = "game"

        this.waveMaker = new Wave(gameEngine);

        //this.player = new Luffy(gameEngine);
        gameEngine.addPlayer(this.player);

        //this.Background = new Background(gameEngine);
        gameEngine.addEntity(this.Background); 

        this.update();
    }

    loadGameOver() {
        this.game.stage = "gameover";
        this.gameOver = true;
        this.clearEntities();
        this.game.addEntity(new GameOverScreen(this.game));
    }

    update() {


        if (this.gameOver == false) {
            this.waveMaker.update();
        }

        let midpointX = params.screenWidth/2 - 100; //Canvas width - half of player width
        let midpointY = params.screenHeight/2 - 90;

        this.x = this.player.x - midpointX;
        this.y = this.player.y - midpointY;
    }
}