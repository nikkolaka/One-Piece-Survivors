class Enemy{
    constructor(game, theId){
        
        this.id = theId;
        this.game = game 
        this.radius = 15;
        this.diameter = this.radius*2;
        this.x = 400;
        this.y = 400;
    };

    update() {

        for(let i = 0; i < this.game.enemies.length; i++){
            if(this.id !== this.game.enemies[i].id && this.id !== 0){
                checkCircleColliding(this,this.game.enemies[i])
            }   
            enemyTracking(this, this.game);
        }

        
    };

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    };
}

    
            




class Navy{
    constructor(game, theId){
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

        this.radius = 10;
        this.diameter = this.radius*2;
        this.scale = 1.5;

        this.x = 10;
        this.y = 10;

        //stats
        this.health = 100;

    };

    loadAnimation(){
        // walking right
        this.animation[0] = new Animator(this.spriteSheet, 0, 10, 70, 60, 3, .2, false, true);
        //walking left
        this.animation[1] = new Animator(this.spriteSheet, 0, 80, 70, 60, 3, .2, true, true);
        
        // dead right

        // dead left
    }

    update(){
        for(let i = 0; i < this.game.enemies.length; i++){
            if(this.id !== this.game.enemies[i].id && this.id !== 0){
                checkCircleColliding(this,this.game.enemies[i])
            }   
            enemyTracking(this, this.game);
        }
        if (this.x > this.game.playerLocation.x){
            this.facing = 1;
        }else{
            this.facing = 0;
        }

    };

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 70, this.y + 50, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

}

class Doflamingo{
    constructor(game, theId){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/Doflamingo.png");
        this.animation =[];
        this.loadAnimation();

        //states
        this.state = 0; // 0 = alive, 1 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.radius = 10;
        this.diameter = this.radius*2;
        this.scale = 1.5;

        this.x = 10;
        this.y = 10;

        //stats
        this.health = 100;

    };

    loadAnimation(){
        // walking right
        this.animation[0] = new Animator(this.spriteSheet, 8, 0, 79, 88, 8, .19, false, true);
        //walking left
        this.animation[1] = new Animator(this.spriteSheet, 656, 0, 79, 88, 8, .19, true, true);
        
        // dead right

        // dead left
    }

    update(){
        for(let i = 0; i < this.game.enemies.length; i++){
            if(this.id !== this.game.enemies[i].id && this.id !== 0){
                checkCircleColliding(this,this.game.enemies[i])
            }   
            enemyTracking(this, this.game);
        }
        if (this.x > this.game.playerLocation.x){
            this.facing = 1;
        }else{
            this.facing = 0;
        }

    };

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 55, this.y + 50, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

}