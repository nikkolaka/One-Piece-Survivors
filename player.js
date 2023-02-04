class luffy{
    constructor(game, theId){
        this.game = game;
        this.id = theId;
        this.weapons = [new Gomu(game)];
        this.game.luffy = this;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/luffy7.png");
        this.loadAnimation(this.spriteSheet);

        //states
        this.states = 0; // 0 = idle, 1 = walking 2 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.x =  512;
        this.y =  384;
        this.radius = 10;

        this.scale = 1.2;

        //stats
        this.health = 100;
        this.speed = 200;

    };

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 3; i++){
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
        this.animation[1][1] = new Animator(spriteSheet, 645,88, 79, 88, 8, .2, true, true);

        // dead right
        this.animation[2][0] = new Animator(spriteSheet, 5, 176, 79, 88, 5, .2, false, false);
        // dead left
        this.animation[2][1] = new Animator(spriteSheet, 5, 264, 79, 88, 5, .2, false, false);
    }

    update(){

        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];

            weapon.update();


        }

        if(this.game.keys.a || this.game.keys.A){
            this.states = 1;
            this.facing = 1;
            this.x -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.d || this.game.keys.D){
            this.states = 1;
            this.facing = 0;
            this.x += this.game.clockTick * this.speed;
        }
        if(this.game.keys.w || this.game.keys.W){
            this.states = 1;
            this.y -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.s || this.game.keys.S){
            this.states = 1;
            this.y += this.game.clockTick * this.speed;
        }
        if(!(this.game.keys.a || this.game.keys.A) && !(this.game.keys.d || this.game.keys.D) &&
         !(this.game.keys.w || this.game.keys.W) && !(this.game.keys.s || this.game.keys.S)){
            this.states = 0;
        }
        if (this.health < 0){
            this.dead = true;
            this.states = 2;
        }
        this.game.playerLocation.x = this.x;
        this.game.playerLocation.y = this.y;


    };

    draw(ctx){
        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];
            weapon.draw(ctx);

        }

        this.animation[this.states][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    }


}