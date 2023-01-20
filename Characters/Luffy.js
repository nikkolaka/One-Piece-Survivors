class Luffy{
    constructor(game){
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/Luffy.png"),  0, 0, 358, 8, 5, .06);
        this.x = 0;
        this.y = 483;
        this.speed = 200;
    };

    update(){
        

    };

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
}