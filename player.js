class luffy{
    constructor(game, theId){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/Luffy.png");
        this.loadAnimation(this.spriteSheet);

        //states
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.x = params.screenWidth/2;
        this.y = params.screenHeight/2;
        this.scale = 1.5;

        //stats
        this.health = 100;
        this.speed = 4;

    };

    loadAnimation(spriteSheet){
        this.animation = [];
        // walking right
        this.animation[0] = new Animator(spriteSheet, 378.5, 0, 56, 90, 8, .2, false, true);
        //walking left
        this.animation[1] = new Animator(spriteSheet, 0, 80, 70, 60, 3, .2, false, true);
    }

    update(){

    };

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}