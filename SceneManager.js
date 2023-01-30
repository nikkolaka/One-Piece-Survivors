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

        this.Luffy = new Luffy(gameEngine);
        gameEngine.addEntity(this.Luffy);

        this.Background = new Background(gameEngine);
        gameEngine.addEntity(this.Background);



    }

    update() {
 

        let midpointX = params.screenWidth/2 - 100; //Canvas width - half of luffy width
        let midpointY = params.screenHeight/2 - 90;


        this.x = this.Luffy.x - midpointX;
        this.y = this.Luffy.y - midpointY;
    }


}