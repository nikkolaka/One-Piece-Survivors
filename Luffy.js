class Luffy{
    constructor(game) {
        this.game = game;

        this.facing = 0;

        this.x = 0;
        this.y = 0;
        this.speed = 0;

        this.animations = [];
        this.loadAnimations();

    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {//4 directions
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./img/Luffy.png"), 0, 93, 80, 184, 8, 0.2);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./img/Luffy.png"), 644, 93, 80, 184, 8, 0.2);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./img/Luffy.png"), 644, 93, 80, 184, 8, 0.2);
        this.animations[3] = new Animator(ASSET_MANAGER.getAsset("./img/Luffy.png"), 0, 93, 80, 184, 8, 0.2);
        this.animations[4] = new Animator(ASSET_MANAGER.getAsset("./img/Luffy.png"), 0, 0, 80, 90, 3, 0.2);

    };

    update() {
        this.x += this.speed*this.game.clockTick;

        if (gameEngine.keys['w']) {
            this.facing = 0;
            this.y -= 2;
        }
        else if (gameEngine.keys['s']) {
            this.facing = 1;
            this.y += 2;
        }
        //determine horizontal
        if (gameEngine.keys['a']) {
            this.facing = 2;
            this.x -= 2;
        }
        else if (gameEngine.keys['d']) {
            this.facing = 3;
            this.x += 2;
        }

        if (!gameEngine.keys['w'] && !gameEngine.keys['s'] && !gameEngine.keys['a'] && !gameEngine.keys['d']) {
            this.facing = 4;
        }

        
        if(this.x > 1024) this.x = -100;

    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   