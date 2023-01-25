class Enemy{
    constructor(game, theId, x, y, velocity){
        
        this.id = theId;
        this.game = game;
        this.radius = 20;
        this.diameter = this.radius*2;
        this.x = x;
        this.y = y;

        this.velocity = velocity;
    };

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

        

        

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill(); 
    
        
    };
}

class Navy{
    constructor(game, theId, x, y, velocity){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/Navy.png");
        this.animation =[];
        this.loadAnimation();

        //states
        this.state = 0; // 0 = alive, 1 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.x = x;
        this.y = y;

        this.scale = 1.5;

        //stats
        this.health = 100;
        this.speed = velocity;

    };

    loadAnimation(){
        // walking right
        this.animation[0] = new Animator(this.spriteSheet, 360, 10, 90, 60, 3, .2, false, true);
        //walking left
        this.animation[1] = new Animator(this.spriteSheet, 0, 80, 70, 60, 3, .2, false, true);
        
        // dead right

        // dead left
    }

    update(){
        this.x += this.speed;
        this.y += this.speed;
    };

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}

class Doflamingo{
    constructor(game, theId){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/Doflamingo2.png");
        this.animation =[];
        this.loadAnimation();

        //states
        this.state = 0; // 0 = alive, 1 = dead
        this.facing = 0; // 0 = right, 1 = leftd
        this.dead = false;

        this.x = 0;
        this.y = 0;


        //stats
        this.scale = 1;

        //stats
        this.health = 100;
        this.speed = 600;

    };

    loadAnimation(){
        // walking right
        this.animation[0] = new Animator(this.spriteSheet, 43.3, 110, 59.1, 120, 8, .1, false, true);
        //walking left
        this.animation[1] = new Animator(this.spriteSheet, 0, 200, 79, 90, 8, .3, true, true);
        
        // dead right

        // dead left
    }

    update(){
    };

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }

}

