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

        this.waveMaker = new Wave(gameEngine);

        this.player = new Brook(gameEngine);
        gameEngine.addPlayer(this.player);
        this.Background = new Background(gameEngine);
        gameEngine.addEntity(this.Background); 
    }

    update() {

        this.waveMaker.update();

        let midpointX = params.screenWidth/2 - 100; //Canvas width - half of player width
        let midpointY = params.screenHeight/2 - 90;

        this.x = this.player.x - midpointX;
        this.y = this.player.y - midpointY;
    }
}