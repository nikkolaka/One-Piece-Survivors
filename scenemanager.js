class SceneManager {
    constructor(game) {
        
        this.game = game;
        this.game.camera = this;
        this.game.stage;

        this.x = 0;
        this.y = 0;

        //this.gameOver = true;

        //initialize entities
        this.player = new Luffy(gameEngine);
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

        //this.Background = new Background(gameEngine);
    }

    // this is the end screen
    loadGameOver() {
        this.game.stage = "gameover";
        this.game.gameOver = true;
        this.clearEntities();
        this.game.addEntity(new EndScreen(this.game));
    }

    loadCharacterSelect() {
        this.game.stage = "characterSelect";
        this.clearEntities();
        gameEngine.addEntity(new CharacterSelect(gameEngine));

    }

    loadAssets() {
        this.clearEntities();
        this.game.camera = this;
        this.game.gameOver = false;

        this.x = 0;
        this.y = 0;

        this.game.stage = "game"; // this is the intro game screen

        this.waveMaker = new Wave(gameEngine);

        //this.player = new Luffy(gameEngine);
        gameEngine.addPlayer(this.player);

        //this.Background = new Background(gameEngine);
        gameEngine.addEntity(this.Background); 

        this.update();
    }

    update() {
        if (this.player.dead) { // if player is dead load game over screen
            this.loadGameOver();
        }

        if (this.game.gameOver == false) { // if game is not over update the wave maker
            this.waveMaker.update();
        }

        let midpointX = params.screenWidth/2 - 100; //Canvas width - half of player width
        let midpointY = params.screenHeight/2 - 90;

        this.x = this.player.x - midpointX;
        this.y = this.player.y - midpointY;
    }
}