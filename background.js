class Background {
    constructor(game, img) {
        this.game = game;

        this.game.Background = this;

        this.x = 0;
        this.y = 0;

        this.width = 5000;
        this.height = 5000;

        this.leftEdge = 5000;
        this.rightEdge = 5000;
     
        this.spritesheet = ASSET_MANAGER.getAsset("./img/OnePieceMap.png"); 
    };

    update() {
        if (this.x > 450) this.x = 450;
        else if (this.x < -4600) this.x = -4600;

        if (this.y > 326) this.y = 326;
        else if (this.y < -4706) this.y = -4706;
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 8000, 8000, this.x - this.game.camera.x, this.y - this.game.camera.y, 10000, 10000);
    };
}
