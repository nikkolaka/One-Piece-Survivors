class Gomu{
    constructor(game){
        this.width = 60;
        this.height = 10;
        this.scale = 1;


        this.spriteSheet = ASSET_MANAGER.getAsset("./img/gomu.png");
        this.loadAnimation(this.spriteSheet);
        this.facing = 0; // 0 = up, 1 = down, 2 = left, 3 = right

        this.direction = Direction.Up;
        this.lastDirection = this.direction;
        if(this.direction == Direction.Up || this.direction == Direction.Down){
            
            this.location = {x1: -10, y1: 3, x2: 10, y2: -3};
        } else{
            var temp = this.width;
            this.width = this.height;
            this.height = temp;
            this.location = {x1: -3, y1: -10, x2: 10, y2: 3};
        }

        this.hitbox = {x1: -(this.width/2), y1: -(this.height/2), x2: (this.width/2), y2: (this.height/2)};
        
        this.game = game;
        this.range = 200;
        this.duration = 95;
        this.step = 0;
    }

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 4; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }
        // up direction
        this.animation[0] = new Animator(spriteSheet, 0, 279, 90, 130, 6, .3, false, true);

        // down direction
        this.animation[1] = new Animator(spriteSheet, 0, 200, 90, 100, 6, .3, false, true);

        // left direction
        this.animation[2] = new Animator(spriteSheet, 0, 88, 79, 90, 6, 2, false, true);
        
        // right direction
        this.animation[3] = new Animator(spriteSheet, 0, 120, 79, 30, 6, .3, true, true);
    }

    update(){

        if(this.direction !== this.lastDirection){
            this.lastDirection = this.direction;
            this.step = 0
            if(this.direction == Direction.Up || this.direction == Direction.Down){
                this.hitbox = {x1: -(this.width/2), y1: -(this.height/2), x2: (this.width/2), y2: (this.height/2)};
                this.location = {x1: -10, y1: 3, x2: 10, y2: -3};
            } else{
                this.hitbox = {x1: -(this.height/2), y1: -(this.width/2), x2: (this.height/2), y2: (this.width/2)};
                this.location = {x1: -3, y1: -10, x2: 10, y2: 3};
            }
        }

        this.location.x1 = this.game.playerLocation.x + this.hitbox.x1;
        this.location.y1 = this.game.playerLocation.y + this.hitbox.y1;
        this.location.x2 = this.game.playerLocation.x + this.hitbox.x2;
        this.location.y2 = this.game.playerLocation.y + this.hitbox.y2;


        if(this.step >= this.range) this.step = 0;
        

        if(this.direction == Direction.Up){
            this.location.y1 -= this.step;
            this.location.y2 -= this.step;
            this.facing = 0;
        } else if(this.direction == Direction.Down){
            this.location.y1 += this.step;
            this.location.y2 += this.step;
            this.facing = 1;
        } else if(this.direction == Direction.Left){
            this.location.x1 -= this.step;
            this.location.x2 -= this.step;
            this.facing = 2;
        } else if(this.direction == Direction.Right){
            this.location.x1 += this.step;
            this.location.x2 += this.step;
            this.facing = 3;
        }

        this.x = this.location.x1 + 42;
        this.y = this.location.y1 + 20;
        
        this.step += this.range/this.duration;

    }

    draw(ctx){
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.beginPath()
        if(this.direction == Direction.Up || this.direction == Direction.Down){
            ctx.rect(this.location.x1 - this.game.camera.x + 52, this.location.y1 - this.game.camera.y + 53, this.width, this.height);
        } else {
            ctx.rect(this.location.x1 - this.game.camera.x + 52, this.location.y1 - this.game.camera.y + 53, this.height, this.width);
        }
        ctx.stroke();
    }






}