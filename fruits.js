class Shop{
    constructor(game){
        this.berryRequirment = 100;
        this.game = game;
        this.chosen = 0;
        this.inShop = false;
        this.choices = [];
        this.maxupgrades = 5;

        this.fruitcount = ["Gomu", "Gomu", "Gomu", "Gomu", "Gomu", "Fire", "Fire", "Fire", "Fire", "Fire",
        "Sword", "Sword", "Sword", "Sword", "Sword", "Axe", "Axe", "Axe", "Axe", "Axe"]

        this.availFruit = {gomu:5, fire:5, sword:5, axe:5};



    }

    update(){
        
        if(this.inShop){
            if(this.chosen != 0){
                this.game.berriesTotal = 0;
                this.inShop = false;
                
                this.addWeapon(this.choices[this.chosen-1])
                this.chosen = 0;
                this.choices = [];
            }

            if(this.game.keys["1"]) this.chosen = 1;
            else if(this.game.keys["2"]) this.chosen = 2;


            return;
        }
        if(this.game.berriesTotal >= this.berryRequirment){
            this.berryRequirment = (this.berryRequirment*1.5) + 50;

            let choice1 = randomInt(this.fruitcount.length)
            this.choices.push(this.fruitcount[choice1])
            this.fruitcount.splice(choice1, 1);

            let choice2 = randomInt(this.fruitcount.length)
            this.choices.push(this.fruitcount[choice2])
            this.fruitcount.splice(choice2, 1);
            
            this.inShop = true;
        }

        

    }

    addWeapon(weaponClass){
        switch (weaponClass) {
            case "Gomu":
                this.availFruit.gomu--;
                if(this.availFruit.gomu == 4) this.game.player.weapons.push(new Gomu(this.game))
                break;
            case "Fire":
                this.availFruit.fire--;
                if(this.availFruit.fire == 4) this.game.player.weapons.push(new Fire(this.game))
                break;
            case "Axe":
                this.availFruit.axe--;
                if(this.availFruit.axe == 4) this.game.player.weapons.push(new Axe(this.game))
                break;
            case "Sword":
                this.availFruit.sword--;
                if(this.availFruit.sword == 4) this.game.player.weapons.push(new Sword(this.game))
                break;
        
            default:
                break;
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
        
        if(this.inShop){
            ctx.fillStyle = "black";
            ctx.fillRect((params.screenWidth/2)-(params.screenWidth/4),(params.screenHeight/2)-(params.screenHeight/4), params.screenWidth/2, params.screenHeight/2 )
            ctx.fillStyle = "white";
            ctx.fillRect((params.screenWidth/2)-(params.screenWidth/4)+5,(params.screenHeight/2)-(params.screenHeight/4)+5, params.screenWidth/2 - 10, params.screenHeight/2-10)
            ctx.fillStyle = "black";
            ctx.fillRect((params.screenWidth/2)-(params.screenWidth/4)+7.5,(params.screenHeight/2)-(params.screenHeight/4)+7.5, params.screenWidth/2 - 15, params.screenHeight/2-15)
            ctx.font = "36px sans-serif";
            ctx.fillStyle = "white";
            ctx.fillText("Press 1 to choose " + this.choices[0], params.screenWidth/2 - 200, params.screenHeight/2 - 50);
            ctx.stroke();
            ctx.fillText("Press 2 to choose " + this.choices[1], params.screenWidth/2 - 200, params.screenHeight/2 + 50);
            ctx.stroke();
        }
        
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
        this.duration = 50;
        this.step = 0;
        this.damage = 20;
        this.knockback = 60;
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
        if(this.game.options.debugging){
            ctx.beginPath()
            ctx.strokeStyle = "red";
            ctx.arc(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, 5, 0, 2 * Math.PI);
            ctx.strokeStyle = "black";
            ctx.rect(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, this.width, this.height);
            ctx.stroke();
            ctx.closePath();
        }
        
    }

    colliding(enemy){
        if(CheckRectCircleColliding(enemy, this) && !enemy.invincible){
            knockback(this, enemy);
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
        this.damage = 30;
        this.knockback = 30;
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


        if(this.game.options.debugging){

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
        
    }

    colliding(enemy){
        if(CheckRectCircleColliding(enemy, this) && !enemy.invincible){
            knockback(this, enemy);
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

        this.scale = 3;

        this.x;
        this.y;

        //sprites
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/firewheel.png"), 0, 0, 105, 110, 19, .1, false, true);

        // hitbox
        
        this.originX;
        this.originY;
        this.game = game;
        
        this.duration = 50;
        this.step = 0;
        this.damage = 25;

        this.innerCircle = {x: this.x, y:this.y, radius: 90}
        this.outerCircle = {x: this.x, y:this.y, radius: 150}
    }

    update(){
        console.log(this.step)
        this.x = this.game.player.x - 15;
        this.y = this.game.player.y - 30;


        this.innerCircle.x = this.x;
        this.outerCircle.x = this.x;
        this.innerCircle.y = this.y;
        this.outerCircle.y = this.y;

        


        if(this.step >= this.range) this.step = 0;
        
        this.step += this.range/this.duration;

    }

    draw(ctx){
        if (this.game.player.dead) return;
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 90, this.y - this.game.camera.y - 70, this.scale);
        if(this.game.options.debugging){
            ctx.beginPath()
            ctx.arc(this.x - this.game.camera.x + 70, this.y - this.game.camera.y+ 90, this.innerCircle.radius, 0, 2 * Math.PI);
            ctx.arc(this.x - this.game.camera.x + 70, this.y - this.game.camera.y+ 90, this.outerCircle.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        
    }

    colliding(enemy){
        if(!checkCircleTouching(enemy, this.innerCircle) && checkCircleTouching(enemy, this.outerCircle) && !enemy.invincible){
            enemy.invincible = true;
            enemy.health -= this.damage;
            var dx = enemy.x - this.x;
            var dy = enemy.y - this.y;

            var distance = Math.sqrt(dx * dx + dy * dy);
            var step = 2;
            
            dx /= distance;
            dy /= distance;
            enemy.x += dx*step;
            enemy.y += dy*step;
            setTimeout(() => {
                enemy.invincible = false;
                
            
            }, 1000)
            
            if (enemy.health >= 0) {
                enemy.state = 2;
                setTimeout(() => {
                    enemy.state = 0;
                }, 200);  
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
        this.damage = 50;
        this.speed = 750;
        this.framesTouching = 0;

        this.visible = true;
        this.trackedEnemy = null;
        this.knockback = 10;
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
        if(this.game.options.debugging){
            ctx.beginPath()
            ctx.arc(this.x - this.game.camera.x + 55, this.y - this.game.camera.y+ 55, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();


        }
        
    }

    colliding(enemy){
        if(checkCircleTouching(enemy, this) && !enemy.invincible){
            knockback(this, enemy);
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