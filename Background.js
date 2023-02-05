class Background{
    constructor(game, img) {
        this.game = game;

        this.game.Background = this;

        this.x = 0;
        this.y = 0;

        this.width = 1280;
        this.height = 1280;

        this.leftEdge = 512;
        this.rightEdge = 512;

                        
        this.spritesheet = ASSET_MANAGER.getAsset("./img/One_Piece_Survivors_Map.png"); 
    };



    update() {
        if (gameEngine.keys['w']) {
            this.y += 2;
        }
        else if (gameEngine.keys['s']) {
            this.y -= 2;
        }
        //determine horizontal
        if (gameEngine.keys['a']) {
            this.x += 2;
        }
        else if (gameEngine.keys['d']) {
            this.x -= 2;

        }

        if (this.x > 450) this.x = 450;
        else if (this.x < -4600) this.x = -4600;

        if (this.y > 326) this.y = 326;
        else if (this.y < -4706) this.y = -4706;
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 1280, 1280, this.x - this.game.camera.x/2.9, this.y - this.game.camera.y/2.9, 5120, 5120);
    };

}