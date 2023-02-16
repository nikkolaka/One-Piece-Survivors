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

        this.radius = 20;
        this.diameter = this.radius*2;
        this.scale = 1.5;

        this.x = 10;
        this.y = 10;

        this.speed = 1.5;

        //stats
        this.health = 100;

        this.game.Navy = this;

        this.removeFromWorld = false;

    };

    loadAnimation(){
        for(var i = 0; i < 2; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }
        // walking right
        this.animation[0][0] = new Animator(this.spriteSheet, 0, 0, 80, 70, 4, .2, false, true);
        //walking left
        this.animation[0][1] = new Animator(this.spriteSheet, 0, 80, 80, 70, 4, .2, false, true);
        
        // dead right
        this.animation[1][0] = new Animator(this.spriteSheet, 0, 210, 70, 60, 3, .2, true, false);
        // dead left
        this.animation[1][1] = new Animator(this.spriteSheet, 0, 140, 70, 60, 3, .2, false, false);
    }

    update(){
        // Check for collisions with other enemies
        for(let i = 0; i < this.game.enemies.length; i++){
            if(this.id !== this.game.enemies[i].id && this.id !== 0){
                checkCircleColliding(this,this.game.enemies[i])
            }   
            enemyTracking(this, this.game);
        }

        // Determine facing
        if (this.x > this.game.playerLocation.x){
            this.facing = 1;
        }else{
            this.facing = 0;
        }
        if(this.health <= 0){
            this.state = 1;
            this.dead = true;
        }

    };

    draw(ctx){
        this.animation[this.state][this.facing].drawFrame(this.game.clockTick, ctx,  this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 50 - this.game.camera.x, this.y + 50 - this.game.camera.y, this.radius, 0, 2 * Math.PI);
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

        this.radius = 20;
        this.diameter = this.radius*2;
        this.scale = 1.5;

        this.x = 10;
        this.y = 10;
        this.speed = 0.8;

        //stats
        this.health = 150;
        this.removeFromWorld = false;
        this.game.Doflamingo = this;

    };
    

    loadAnimation(){
        for(var i = 0; i < 2; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }
        // walking right
        this.animation[0][0] = new Animator(this.spriteSheet, 8, 0, 79, 88, 8, .19, false, true);
        //walking left
        this.animation[0][1] = new Animator(this.spriteSheet, 656, 0, 79, 88, 8, .19, true, true);
        
        // dead right
        this.animation[1][0] = new Animator(this.spriteSheet, 0, 88, 79, 88, 8, .2, false, false);
        // dead left
        this.animation[1][1] = new Animator(this.spriteSheet, 648, 88, 79, 88, 8, .2, true, false);
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
        this.animation[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 55 - this.game.camera.x, this.y + 50 - this.game.camera.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

}

class Blackbeard{
    constructor(game, theId){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/blackbeard1.png");
        this.animation =[];
        this.loadAnimation();

        //states
        this.state = 0; // 0 = alive, 1 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.radius = 20;
        this.diameter = this.radius*2;
        this.scale = 1.5;

        this.x = 10;
        this.y = 10;
        this.speed = 0.8;

        //stats
        this.health = 150;
        this.removeFromWorld = false;
        this.game.Blackbeard = this;

    };
    

    loadAnimation(){
        for(var i = 0; i < 2; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }
        // walking right
        this.animation[0][0] = new Animator(this.spriteSheet, 0, 0, 90, 88, 8, .19, false, true);
        //walking left
        this.animation[1][1] = new Animator(this.spriteSheet, 0, 90, 90, 88, 8, .19, true, true);
        
        // dead right
        this.animation[1][0] = new Animator(this.spriteSheet, 0, 180, 90, 88, 5, .2, false, false);
        // dead left
        this.animation[1][1] = new Animator(this.spriteSheet, 0, 270, 90, 88, 5, .2, true, false);
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
        this.animation[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 55 - this.game.camera.x, this.y + 50 - this.game.camera.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

}

class Buggy{
    constructor(game, theId){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/blackbeard1.png");
        this.animation =[];
        this.loadAnimation();

        //states
        this.state = 0; // 0 = alive, 1 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.radius = 20;
        this.diameter = this.radius*2;
        this.scale = 1.5;

        this.x = 10;
        this.y = 10;
        this.speed = 0.8;

        //stats
        this.health = 150;
        this.removeFromWorld = false;
        this.game.Doflamingo = this;

    };
    

    loadAnimation(){
        // walking right
        this.animation[0][0] = new Animator(this.spriteSheet, 0, 0, 90, 88, 8, .19, false, true);
        //walking left
        this.animation[0][1] = new Animator(this.spriteSheet, 0, 90, 90, 88, 8, .19, true, true);
        
        // dead right
        this.animation[1][0] = new Animator(this.spriteSheet, 0, 180, 90, 88, 5, .2, false, false);
        // dead left
        this.animation[1][1] = new Animator(this.spriteSheet, 0, 270, 90, 88, 5, .2, true, false);
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
        this.animation[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 55 - this.game.camera.x, this.y + 50 - this.game.camera.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

}

class Akainu{
    constructor(game, theId){
        this.game = game;
        this.id = theId;

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/blackbeard1.png");
        this.animation =[];
        this.loadAnimation();

        //states
        this.state = 0; // 0 = alive, 1 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        this.radius = 20;
        this.diameter = this.radius*2;
        this.scale = 1.5;

        this.x = 10;
        this.y = 10;
        this.speed = 0.8;

        //stats
        this.health = 150;
        this.removeFromWorld = false;
        this.game.Doflamingo = this;

    };
    

    loadAnimation(){
        for(var i = 0; i < 2; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }
        // walking right
        this.animation[0][0] = new Animator(this.spriteSheet, 0, 0, 90, 88, 8, .19, false, true);
        //walking left
        this.animation[0][1] = new Animator(this.spriteSheet, 0, 90, 90, 88, 8, .19, true, true);
        
        // dead right
        this.animation[1][0] = new Animator(this.spriteSheet, 0, 180, 90, 88, 5, .2, false, false);
        // dead left
        this.animation[1][1] = new Animator(this.spriteSheet, 0, 270, 90, 88, 5, .2, true, false);
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
        this.animation[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 55 - this.game.camera.x, this.y + 50 - this.game.camera.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

}