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

        this.player = new Luffy(gameEngine);
        gameEngine.addPlayer(this.player);
        

        for(let i = 0; i < 200; i++){
            let item;
            switch (randomInt(5)) {
                case 0:
                    item = new Diamond(gameEngine);
                    break;
                case 1:
                    item = new Weight(gameEngine);
                    break;
                case 2:
                    item = new Bomb(gameEngine);
                    break;
                case 3:
                    item = new Freeze(gameEngine);
                    break;
                case 4:
                    item = new Meat(gameEngine);
                    break;
                
            
            }
            item.x = randomInt(7680);
            item.y = randomInt(7680);

            gameEngine.addEntity(item);
        }
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