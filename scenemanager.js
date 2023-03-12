class SceneManager {
    constructor(game) {
        
        this.game = game;
        this.game.camera = this;
        this.game.stage;

        this.x = 0;
        this.y = 0;

        //initialize entities
        this.player = new Luffy(gameEngine);
        this.Background = new Background(gameEngine);
        this.waveMaker = new Wave(gameEngine);

        // music
        this.Opening = new Audio("./music/Opening.mp3");
        this.Opening.loop = true;
        this.Opening.volume = 0.2;
        this.Opening.play();
        this.Opening.pause();

        this.In_Game = new Audio("./music/In_Game.mp3");
        this.In_Game.loop = true;
        this.In_Game.volume = 0.2;
        this.In_Game.play();
        this.In_Game.pause();

        this.Death = new Audio("./music/Death.mp3");
        this.Death.loop = true;
        this.Death.volume = 0.2;
        this.Death.play();
    }

    clearEntities() {
        this.game.entities = []
        this.game.enemies = []
        this.game.berries = []
    }

    loadTitleScreen() {
        this.game.stage = "title";
        this.clearEntities();
        gameEngine.addEntity(new StartScreen(gameEngine));
        this.game.berriesTotal = 0;
        this.game.score = 0;
        this.game.wave = 0;


        this.Opening.play();
        this.In_Game.pause();
        this.Death.pause();

    }

    // this is the end screen
    loadGameOver() {
        this.game.stage = "gameover";
        // this.game.gameOver = true;
        this.clearEntities();
        gameEngine.addEntity(new EndScreen(gameEngine));

        this.Opening.pause();
        this.In_Game.pause();
        this.Death.play();
    }

    loadCharacterSelect() {
        this.game.stage = "characterSelect";
        this.clearEntities();

        gameEngine.addEntity(new characterSelectScreen(gameEngine));

        this.Opening.play();
        this.In_Game.pause();
        this.Death.pause();

    }

    loadAssets() {
        this.clearEntities();
        this.game.camera = this;
        this.game.gameOver = false;

        this.x = 0;
        this.y = 0;

        this.game.stage = "game"; // this is the intro game screen

        if (this.game.luffyclicked) {
            this.player = new Luffy(gameEngine);
        }
        if (this.game.zoroclicked) {
            this.player = new Zoro(gameEngine);
        }
        if (this.game.brookclicked) {
            this.player = new Brook(gameEngine);
        }

        this.Background = new Background(gameEngine);
        this.waveMaker = new Wave(gameEngine);

        this.Opening.pause();
        this.In_Game.play();
        this.Death.pause();

        //this.player = new Luffy(gameEngine);
        gameEngine.addPlayer(this.player);

        
        this.Background = new Background(gameEngine);
        gameEngine.addEntity(this.Background); 

        this.update();
    }

    update() {

        
        if (this.game.characterselected && this.player.dead) { // if player is dead load game over screen
            this.game.gameOver = true;
            this.loadGameOver();
        }

        if (this.game.gameOver == false) { // if game is not over update the wave maker
            this.waveMaker.update();
        }
        else {
            this.game.enemies = [];
            this.game.berries = [];

            }

        

        let midpointX = params.screenWidth/2 - 100; //Canvas width - half of player width
        let midpointY = params.screenHeight/2 - 90;

        this.x = this.player.x - midpointX;
        this.y = this.player.y - midpointY;
    }
}