class luffy{
    constructor(game, theId){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/Luffy4.png");
        this.loadAnimation(this.spriteSheet);

        //states
        this.states = 0; // 0 = idle, 1 = walking
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.x =  512;
        this.y =  384;

        this.scale = 1.5;

        //stats
        this.health = 100;
        this.speed = 4;

    };

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 2; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }
        // idle right
        this.animation[0][0] = new Animator(spriteSheet, 0, 0, 79, 88, 3, .3, false, true);
        // idle left
        this.animation[0][1] = new Animator(spriteSheet, 239, 0, 79, 88, 3, .3, false, true);

        // walking right
        this.animation[1][0] = new Animator(spriteSheet, 0, 88, 79, 88, 8, .2, false, true);
        //walking left
        this.animation[1][1] = new Animator(spriteSheet, 638,88, 79, 88, 8, .2, false, true);
    }

    update(){
        if(this.game.keys.a){
            this.states = 1;
            this.facing = 1;
            this.x -= this.speed;
        }
        if(this.game.keys.d){
            this.states = 1;
            this.facing = 0;
            this.x += this.speed;
        }
        if(this.game.keys.w){
            this.states = 1;
            this.y -= this.speed;
        }
        if(this.game.keys.s){
            this.states = 1;
            this.y += this.speed;
        }
        if(!this.game.keys.a && !this.game.keys.d && !this.game.keys.w && !this.game.keys.s){
            this.states = 0;
        }
        if (this.health < 0){
            this.dead = true;
        }
        this.game.playerLocation.x = this.x;
        this.game.playerLocation.y = this.y;
    };

    draw(ctx){
        if (this.dead){
            
        } else{
            this.animation[this.states][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        }
    }
}