class Enemy{
    constructor(game, theId, x, y, velocity){
        
        this.id = theId;
        this.game = game 
        this.radius = 15;
        this.diameter = this.radius*2;
        this.x = 400;
        this.y = 400;

        this.velocity = velocity;
    };

    update() {

        for(let i = 0; i < this.game.enemies.length; i++){
            if(this.id !== this.game.enemies[i].id && this.id !== 0){
                checkCircleColliding(this,this.game.enemies[i])
            }   
            enemyTracking(this, this.game);
        }

        
    };

    } 

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
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

        this.x = 0;
        this.y = 0;
        this.scale = 1.5;

        //stats
        this.health = 100;
        this.speed = 4;

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
        

    };

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}

class Dofalmingo{
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
        this.scale = 1;

        //stats
        this.health = 100;
        this.speed = 4;

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