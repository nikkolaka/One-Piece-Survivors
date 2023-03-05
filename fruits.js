class Shop{
    constructor(game){
        this.berryRequirment = 100;
        this.game = game;

        this.inShop = false;

    }

    update(){
        if(this.game.berriesTotal >= this.berryRequirment){
            this.game.berriesTotal = 0
            this.berryRequirment = (this.berryRequirment*1.5) + 50;
            this.inShop = true;
        }

        

    }

    draw(ctx){
        var berryWidth = params.screenWidth*(this.game.berriesTotal/this.berryRequirment);
        ctx.fillStyle = "grey";
        ctx.fillRect(0,0, params.screenWidth, 20)
        ctx.stroke();
        ctx.fillStyle = "blue";
        ctx.fillRect(0,0, berryWidth, 20)
        ctx.stroke();
    }




}


class Gomu{
    constructor(game){
        //hitbox dimensions
        this.ogWidth = 50;
        this.ogHeight = 20;
        

        this.width = 50;
        this.height = 20;
        this.scale = 1;

        this.x;
        this.y;

        //sprites

        // Gomu
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/gomu.png");
        //this.loadAnimation(this.spriteSheet, 1);

        // Big Gomu
        this.bigSpriteSheet = ASSET_MANAGER.getAsset("./img/big gomu.png");
        this.loadAnimation(this.bigSpriteSheet, 2);

        this.facing = 0; // 0 = up, 1 = down, 2 = left, 3 = right

        this.direction = Direction.Up;
        this.lastDirection = this.direction;
        this.color = "black"
        

        // hitbox
        
        this.originX;
        this.originY;
        this.game = game;
        this.range = 200;
        this.duration = 95;
        this.step = 0;
        this.damage = 5;
        this.knockbackDistance = 50
    }

    loadAnimation(spriteSheet, version) {
        this.animation = [];
        for(var i = 0; i < 4; i++){
            this.animation.push([]);
        }



        // Gomu sprites
        if (version == 1){
            // up direction
            this.animation[0] = new Animator(spriteSheet, -2, 270, 90, 90, 6, .3, false, true);

            // down direction
            this.animation[1] = new Animator(spriteSheet, -2, 180, 90, 90, 6, .3, false, true);

            // left direction
            this.animation[2] = new Animator(spriteSheet, -1, 0, 90, 90, 6, .3, false, true);
            
            // right direction
            this.animation[3] = new Animator(spriteSheet, -1, 90, 90, 90, 6, .3, true, true);



            // Big Gomu sprites
        } else if (version == 2){

            // up direction
            this.animation[0] = new Animator(spriteSheet, 0, 250, 125, 125, 6, .3, false, true);

            // down direction
            this.animation[1] = new Animator(spriteSheet, 0, 375, 125, 125, 6, .3, false, true);

            // left direction
            this.animation[2] = new Animator(spriteSheet, 0, 125, 125, 125, 6, .3, false, true);
            
            // right direction
            this.animation[3] = new Animator(spriteSheet, 0, 0, 125, 125, 6, .3, false, true);
        }
    }

    update(){
        this.originX = this.game.player.x - this.width/2;
        this.originY = this.game.player.y - this.height/2;

        this.direction = this.game.player.direction;

        if(this.direction !== this.lastDirection){
            this.lastDirection = this.direction;
            this.step = 0
            if(this.direction == Direction.Up || this.direction == Direction.Down){
                
                this.width = this.ogWidth;
                this.height = this.ogHeight;
                this.originX = this.game.player.x - this.width/2;
                this.originY = this.game.player.y - this.height/2;
                /* this.hitbox = {x1: -(this.width/2), y1: -(this.height/2), x2: (this.width/2), y2: (this.height/2)};
                this.location = {x1: -10, y1: 3, x2: 10, y2: -3}; */
            } else{
                this.height = this.ogWidth;
                this.width = this.ogHeight;
                this.originX = this.game.player.x - this.width/2;
                this.originY = this.game.player.y - this.height/2;
                /* this.hitbox = {x1: -(this.height/2), y1: -(this.width/2), x2: (this.height/2), y2: (this.width/2)};
                this.location = {x1: -3, y1: -10, x2: 10, y2: 3}; */
            }
        }

        this.x = this.originX;
        this.y = this.originY;
        


        if(this.step >= this.range) this.step = 0;
        
        //updates the direction of gomu
        if(this.direction == Direction.Up){
            this.y -= this.step;
            
            this.facing = 0;
        } else if(this.direction == Direction.Down){
            this.y += this.step;
            
            this.facing = 1;
        } else if(this.direction == Direction.Left){
            this.x -= this.step;
            this.facing = 2;
        } else if(this.direction == Direction.Right){
            this.x += this.step;
            this.facing = 3;
        }
        
        
        this.step += this.range/this.duration;

    }

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x + 40 - this.game.camera.x, this.y + 25 - this.game.camera.y, this.scale);    
        ctx.beginPath()
        ctx.strokeStyle = "red";
        ctx.arc(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, 5, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.rect(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, this.width, this.height);
        ctx.stroke();
        ctx.closePath();
    }

    colliding(enemy){
        if(CheckRectCircleColliding(enemy, this)){
            if(enemy.canKnockback) {
                knockback(this, enemy);
            }
            enemy.health -= this.damage;
            if (enemy.health >= 0) {
                enemy.state = 2;
                setTimeout(() => {
                    enemy.state = 0;
                }, 400);  
            } else{
                enemy.state = 1;
                enemy.dead = true;
            }      
        }
    }






}

class Sword{
    constructor(game){
        //hitbox dimensions
        this.width = 30;
        this.height = 80;
        this.ogWidth = 30;
        this.ogHeight = 80;
        this.scale = 1;

        this.x;
        this.y;

        //sprites
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/sword.png");
        this.loadAnimation(this.spriteSheet);
        this.facing = 2; // 0 = up, 1 = down, 2 = left, 3 = right

        this.direction = Direction.Left;
        

        // hitbox
        
        this.originX;
        this.originY;
        this.game = game;
        this.range = 200;
        this.duration = 50;
        this.step = 0;
        this.damage = 6;
        this.knockbackDistance = 30;
    }

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 4; i++){
            this.animation.push([]);
        }
        // up direction
        this.animation[0] = new Animator(spriteSheet, 27, 385,  95, 180, 3, .2, true, true);

        // down direction
        this.animation[1] = new Animator(spriteSheet, 27, 200, 100, 180, 3, .2, false, true);

        // left direction
        this.animation[2] = new Animator(spriteSheet, 0, 90, 183, 90, 3, .2, false, true);
        
        // right direction
        this.animation[3] = new Animator(spriteSheet, 0, 0, 183, 90, 3, .2, true, true);
    }

    update(){
        this.originX = this.game.player.x - this.width/2;
        this.originY = this.game.player.y - this.height/2;

        
        if(this.direction == Direction.Up || this.direction == Direction.Down){
                
            this.width = this.ogWidth;
            this.height = this.ogHeight;
            this.originX = this.game.player.x - this.width/2;
            this.originY = this.game.player.y - this.height/2;
        } else{
            this.height = this.ogWidth;
            this.width = this.ogHeight;
            this.originX = this.game.player.x - this.width/2;
            this.originY = this.game.player.y - this.height/2;
        }

        this.x = this.originX;
        this.y = this.originY;
        


        if(this.step >= this.range) this.step = 0;
        
        //updates the direction of gomu
        if(this.direction == Direction.Up){
            this.y -= this.step;
            
            this.facing = 0;
        } else if(this.direction == Direction.Down){
            this.y += this.step;
            
            this.facing = 1;
        } else if(this.direction == Direction.Left){
            this.x -= this.step;
            this.facing = 2;
        } else if(this.direction == Direction.Right){
            this.x += this.step;
            this.facing = 3;
        }
        
        
        this.step += this.range/this.duration;

    }

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);


        
        ctx.beginPath()
        
        ctx.arc(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, 5, 0, 2 * Math.PI);
        if(this.direction == Direction.Up || this.direction == Direction.Down){
            ctx.rect(this.x - this.game.camera.x + 50, this.y - this.game.camera.y + 53, this.width, this.height);
        } else {
            ctx.rect(this.x - this.game.camera.x + 53, this.y - this.game.camera.y + 50, this.width, this.height);
        }
        ctx.stroke();
        ctx.closePath();
    }

    colliding(enemy){
        if(CheckRectCircleColliding(enemy, this)){
            if(enemy.canKnockback) {
                knockback(this, enemy);
            }
            enemy.health -= this.damage;
            if (enemy.health >= 0) {
                enemy.state = 2;
                setTimeout(() => {
                    enemy.state = 0;
                }, 400);  
            } else{
                enemy.state = 1;
                enemy.dead = true;
            }    
        }
    }

}


class Fire{
    constructor(game){
        //hitbox dimensions
        this.width = 30;
        this.height = 80;
        this.ogWidth = 30;
        this.ogHeight = 80;
        this.scale = 3;

        this.x;
        this.y;

        //sprites
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/firewheel.png"), 0, 0, 105, 110, 19, .1, false, true);

        // hitbox
        
        this.originX;
        this.originY;
        this.game = game;
        this.range = 200;
        this.duration = 50;
        this.step = 0;
        this.damage = 6;
    }

    update(){
        console.log(this.step)
        this.originX = this.game.player.x - this.width/2;
        this.originY = this.game.player.y - this.height/2;

        this.x = this.originX;
        this.y = this.originY;
        


        if(this.step >= this.range) this.step = 0;
        
        this.step += this.range/this.duration;

    }

    draw(ctx){
        if (this.game.player.dead) return;
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 90, this.y - this.game.camera.y - 70, this.scale);
        
        ctx.beginPath()
        ctx.rect(this.x - this.game.camera.x + 50, this.y - this.game.camera.y + 53, this.width, this.height);
        ctx.stroke();
        ctx.closePath();
    }

    colliding(enemy){
        if(CheckRectCircleColliding(enemy, this)){
            enemy.health -= this.damage;
            if (enemy.health >= 0) {
                enemy.state = 2;
                setTimeout(() => {
                    enemy.state = 0;
                }, 400);  
            } else{
                enemy.state = 1;
                enemy.dead = true;
            }    
        }
    }






}

class Axe{
    constructor(game){
        //hitbox dimensions
        this.radius = 20;
        this.scale = 1;

        this.x;
        this.y;

        //sprites
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/axe.png"), 0, 0, 88, 110, 10, .1, false, true);

        // hitbox
        
        this.originX;
        this.originY;
        this.game = game;
        this.range = 200;
        this.duration = 50;
        this.step = 0;
        this.damage = 6;
        this.speed = 750;
        this.framesTouching = 0;

        this.visible = true;
        this.trackedEnemy = null;
    }

    update(){
        this.originX = this.game.player.x;
        this.originY = this.game.player.y;


        if(this.trackedEnemy == null){
            this.visible = false;
            this.framesTouching = 0;
            this.x = this.originX;
            this.y = this.originY;
            this.trackedEnemy = closestEnemy(this.game);
        } else{
            this.visible = true;
            if(checkCircleTouching(this, this.trackedEnemy)) this.framesTouching++;
            enemyTracking(this, this.trackedEnemy, this.game);
            if(this.framesTouching > 10) this.trackedEnemy = null;
        }
        

        
        
    

    }

    draw(ctx){
        if (!this.visible) return;
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + 10, this.y - this.game.camera.y + 10, this.scale);
        
        ctx.beginPath()
        ctx.arc(this.x - this.game.camera.x + 55, this.y - this.game.camera.y+ 55, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }

    colliding(enemy){
        if(checkCircleTouching(enemy, this)){
            if(enemy.canKnockback) {
                knockback(this, enemy);
            }
            enemy.health -= this.damage;
            if (enemy.health >= 0) {
                enemy.state = 2;
                setTimeout(() => {
                    enemy.state = 0;
                }, 400);  
            } else{
                enemy.state = 1;
                enemy.dead = true;
            }    
        }
    }






}





// Enemy attacks

class String{
    constructor(game){
        //hitbox dimensions
        this.ogWidth = 50;
        this.ogHeight = 20;
        

        this.width = 50;
        this.height = 20;
        this.scale = 1;

        this.x;
        this.y;

        //sprites
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/string.png");
        this.loadAnimation(this.spriteSheet);
        this.facing = 0; // 0 = up, 1 = down, 2 = left, 3 = right

        this.direction = Direction.Up;
        this.lastDirection = this.direction;
        this.color = "black"
        

        // hitbox
        
        this.originX;
        this.originY;
        this.game = game;
        this.range = 200;
        this.duration = 95;
        this.step = 0;
    }

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 4; i++){
            this.animation.push([]);
        }
        // up direction
        this.animation[0] = new Animator(spriteSheet, -2, 270, 90, 90, 8, .3, false, true);

        // down direction
        this.animation[1] = new Animator(spriteSheet, -2, 180, 90, 90, 8, .3, false, true);

        // left direction
        this.animation[2] = new Animator(spriteSheet, -1, 0, 90, 90, 8, .3, false, true);
        
        // right direction
        this.animation[3] = new Animator(spriteSheet, -1, 90, 90, 90, 8, .3, true, true);
    }

    update(){
        this.originX = this.game.player.x - this.width/2;
        this.originY = this.game.player.y - this.height/2;

        this.direction = this.game.player.direction;

        if(this.direction !== this.lastDirection){
            this.lastDirection = this.direction;
            this.step = 0
            if(this.direction == Direction.Up || this.direction == Direction.Down){
                
                this.width = this.ogWidth;
                this.height = this.ogHeight;
                this.originX = this.game.player.x - this.width/2;
                this.originY = this.game.player.y - this.height/2;
                /* this.hitbox = {x1: -(this.width/2), y1: -(this.height/2), x2: (this.width/2), y2: (this.height/2)};
                this.location = {x1: -10, y1: 3, x2: 10, y2: -3}; */
            } else{
                this.height = this.ogWidth;
                this.width = this.ogHeight;
                this.originX = this.game.player.x - this.width/2;
                this.originY = this.game.player.y - this.height/2;
                /* this.hitbox = {x1: -(this.height/2), y1: -(this.width/2), x2: (this.height/2), y2: (this.width/2)};
                this.location = {x1: -3, y1: -10, x2: 10, y2: 3}; */
            }
        }

        this.x = this.originX;
        this.y = this.originY;
        


        if(this.step >= this.range) this.step = 0;
        
        //updates the direction of string
        if(this.direction == Direction.Up){
            this.y -= this.step;
            
            this.facing = 0;
        } else if(this.direction == Direction.Down){
            this.y += this.step;
            
            this.facing = 1;
        } else if(this.direction == Direction.Left){
            this.x -= this.step;
            this.facing = 2;
        } else if(this.direction == Direction.Right){
            this.x += this.step;
            this.facing = 3;
        }
        
        
        this.step += this.range/this.duration;

    }

    draw(ctx){
        if (this.game.player.health <= 0) return;
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x + 40 - this.game.camera.x, this.y + 25 - this.game.camera.y, this.scale);    
        ctx.beginPath()
        ctx.strokeStyle = "red";
        ctx.arc(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, 5, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.rect(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, this.width, this.height);
        ctx.stroke();
        ctx.closePath();
    }

    colliding(enemy){
        if(CheckRectCircleColliding(enemy, this)){
            enemy.speed -= this.speed/4;
            setTimeout(() => {
                enemy.speed += this.speed/4;
            }, 5000);
        }
    }






}